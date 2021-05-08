
import * as d3 from 'd3';
import { gray, select } from 'd3';
import {withRouter, NextRouter, Router} from 'next/router'


class D3Component {

    containerEl;
    props;
    svg;

    constructor(containerEl, props, router) {
        this.containerEl = containerEl;
        this.props = props;
        const { width, height } = props;
        this.svg = d3.select(containerEl)
            .append('svg')
            .style('background-color', 'white')
            .attr('width', width)
            .attr('height', height);
        this.router = router;
        
        this.buildNetwork(props.data, containerEl, this.svg, width, height, router);
    }

    // updateDatapoints = () => {
    //     const { svg, props: { data, width, height } } = this;
    //     svg.selectAll('circle')
    //         .data(data)
    //         .enter()
    //         .append('circle')
    //         .style('fill', 'red')
    //         .attr('cx', () => Math.random() * width)
    //         .attr('cy', () => Math.random() * height)
    //         .attr('r', 10)
    //         .on('mouseup', (d, i, nodes) => this.setActiveDatapoint(d, nodes[i]));
    // }

    // setActiveDatapoint = (d, node) => {
    //     d3.select(node).style('fill', 'yellow');
    //     this.props.onDatapointClick(d);
    // }




    buildNetwork = (data, chartRef, svg, width, height, router) => {
        // console.log(data)
        function linkFinder(data) {
            let node_links = []
            

            data.nodes.forEach(nodes => {
                // console.log(typeof (nodes), nodes, nodes.links.target)
                if ((nodes.links) != []) {
                    // node_links.push(nodes.links)
                    // console.log(nodes.links[0].source)
                    nodes.links.forEach(dataLink => {
                        let onelink = { "source": null, "target": null, "value": 5 }
                        onelink.source = dataLink.source
                        onelink.target = dataLink.target
                        // if (typeof onelink.value == 'undefined') {
                        //     if (nodes.group == 'page') {
                        //         onelink.value = 10;
                        //     } else if (nodes.group == 'subcategory') {
                        //         onelink.value = 14;
                        //     } else {
                        //         onelink.value = 20;
                        //     }
                        // }

                        node_links.push(onelink)

                    })

                }
            })
            return node_links
        }
        //object create here is essentially a translation layer to the d3 I wrote for a previous project. This makes the data structure match what the script expects to see.
        // console.log(data)



        const nodes = data.nodes
        const links = linkFinder(data)

        const iconSize = 48
        const rectWidth = 150

        const labelsNodes = data.nodes.map(d => Object.create(d));





        // var width = chartRef.width.animVal.value;
        // var height = document.getElementById('chart').height.animVal.value;
        // var svg = d3.select('svg')
        // width = +svg.attr("width"),
        // height = +svg.attr("height");

        var attractForce = d3.forceManyBody().strength(1).distanceMax(200).distanceMin(10);
        var repelForce = d3.forceManyBody().strength(-270).distanceMax(450).distanceMin(1);

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).strength(0.09))
            .force("charge", d3.forceManyBody())
            .force("attractForce", attractForce)
            .force("repelForce", repelForce)
            .velocityDecay(.12);

        // .force("center", d3.forceCenter(100 / 2, 100 / 2));

        const link = svg.append("g")
            .attr("class", "links")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));

        const node = svg.append('g')
            .attr('class', "nodes")
            .selectAll(".node")
            .data(nodes)
            .join('g')
            .attr("class", "node")
            .call(drag(simulation));

        var hyperlink = node.append("svg:a")
            // .text(function(d) {
            //     return d.id;
            // })
            // .attr("xlink:href", function (d) {
            //     if (d.url != null){
            //         return ("xlink:href", d.url)
            //     } else if (d.group != null && d.slug != null && d.slug != undefined){
            //         return ("xlink:href", ("/article").concat("/", d.slug))
            //     }
                
            // })
            .attr('class', "hyperlink")

            .on("mouseover", function (i,d) {
                return tooltip.style("visibility", "visible").text(d.description)
            })
            .on("mousemove", function (i, d) {
                
                return tooltip.style("top", (i.clientY - 5) + "px").style("left", (i.clientX + 30) + "px");
            })
            .on("mouseleave", function (d, i) {
                return tooltip.style("visibility", "hidden")
            }
            )
            .on('click', function(i,d ){
                  if (d.url != null){
                    router.push(d.url)
                    return
                } else if (d.group != null && d.slug != null && d.slug != undefined){
                    router.push(("/article").concat("/", d.slug))
                    return
                }

            })
        var tooltip = d3.select(chartRef)
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
            // .attr("class", "tooltip card")
            .attr("id", "tooltip")
            // .text("I'm a circle!");
            

        const rect = hyperlink.append("rect")
            .filter(function (d) {
                // If it doesn't have an icon, give it a circle
                return (d.icon == null)
            })
            .attr('width', rectWidth)
        // .attr('height', function(d){
        //     console.log(wrap(d.id,50))

        //     return 50
        // })
        .attr('x',-rectWidth/2)
        .attr('y',-25)
        .attr('rx', 5)
        .style('fill', 'gray')

        const text = hyperlink.append('text')
            .text(function (d) {
                return d.id;
            })
            .style('fill', '#000')
            .style('font-size', '14px')
            .style('z-index','100')
            .attr("text-anchor", "middle")
            .attr('class','caption')
            .attr('x', 0)
            .attr('y', function(d){
                if(d.icon!=null){
                    return iconSize-3
                } else {
                    return -3
                }
            })
            .attr('dy', .01)
            .call(wrap, rectWidth)
            .filter(d=>{

            })
            

        //set the height of the rectangle to match the length of the text
        hyperlink.select('text').selectAll('tspan').call(function(d){
 
            for (var i = 0; i < (d._groups).length; i++) {
         
                var lastLineHeight = ([...d._groups[i]].slice(-1)[0].getAttribute('dy'))
                //get just the number of last line height, convert to float, add one. 
                lastLineHeight = (parseFloat(lastLineHeight.match(/\d+|.\d+/g).join(""))+2).toPrecision(3)
                //convert back to string, change to em
                lastLineHeight = String(lastLineHeight+'em')
                // console.log(lastLineHeight)
                var useless = [...d._groups[i]].slice(-1)[0].parentNode.parentNode.getElementsByTagName('rect')[0].setAttribute('height',lastLineHeight)
            }
        }
        )

        // .attr('height', function(d){return text.attr('y')})

        // const visibleCircles = hyperlink.append("circle")
        //     .filter(function (d) {
        //         // If it doesn't have an icon, give it a circle
        //         return (d.icon == null)
        //     })
        //     .attr("class", "circle")
        //     .attr("stroke", d => 'black')
        //     .attr("stroke-width", 1.5)
        //     .attr("r", d => radius(d.group))
        //     .attr("fill", d => color(d.group))
        //     // .attr("fill", "red")
        //     .attr("opacity", .5)

        
        // const touchTargetCircles = hyperlink.append("circle")
        //     .filter(function (d) {
        //         // If it doesn't have an icon, give it a circle
        //         return (d.icon != null)
        //     })
        //     .attr("class", "circle")
        //     .attr("r", 40)
        //     .attr("visibility", "visible")
        //     .attr("opacity",0)


        const icons = hyperlink.append('text')
            // .attr('class', 'handle')
            .attr('class', "fa")
            .attr("text-anchor", "middle")
            .attr('alignment-baseline', "middle")
            .attr('width', iconSize)
            .attr('height', iconSize)
            .attr('x', -(iconSize/2))
            .attr('y', -(iconSize/2))
            .attr("class", d => d.icon)


        simulation.on("tick", () => {
            link
                .attr("x1", d => Math.max(80, Math.min(width - 80, d.source.x)))
                .attr("y1", d => Math.max(rectWidth/3, Math.min(height, d.source.y)))
                .attr("x2", d => Math.max(80, Math.min(width - 80, d.target.x)))
                .attr("y2", d => Math.max(rectWidth/3, Math.min(height, d.target.y)));

                // .attr("x1", d => d.source.x)
                // .attr("y1", d => d.source.y)
                // .attr("x2", d => d.target.x)
                // .attr("y2", d => d.target.y)
            node
                .attr("transform", d => `translate(${Math.max(rectWidth/3, Math.min(width - rectWidth/3, d.x))}, ${Math.max(rectWidth/3, Math.min(height - rectWidth/3-15, d.y))})`);

        });

        width, height = resize();
        d3.select("#d3-div").on("resize", console.log('resized@!!'));
        function resize() {
                //get the element containing the d3 and use client height and width attributes to get the size of this element and set the size of the svg as the same size
            let parentElement = document.getElementById('d3-div')
            width = parentElement.clientWidth, height = parentElement.clientHeight;
            svg.attr("width", width).attr("height", height);
            // console.log(width, height)
            simulation.force("center", d3.forceCenter(width / 2, height / 2)).restart();
            return svg.attr("width"), svg.attr('height')
        }

           // Function to wrap text written by Mike Bostock 
    function wrap(text, width) {
        text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        } 
        });
    }
        return svg.node();
    };



    
    // testFunction = (svg) => {
    //     console.log("TEST FUNC")
    //     let parentElement = document.getElementById('d3-div')
    //     console.log(`parent ELEM: ${parentElement.clientWidth}`)
    //     width = parentElement.clientWidth, height = parentElement.clientHeight;
    //     // svg.attr("width", width).attr("height", height);
    //     console.log(width, height)
    //     simulation.force("center", d3.forceCenter(width / 2, height / 2)).restart();
    //     // return svg.attr("width"), svg.attr('height')
    // }


}

// width, height = resize();



//Force Directed Graph Helper functions
const drag = simulation => {

    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}


const color = d3.scaleOrdinal([" ##9cbbe1", "##7ce6b6", "green", "orange"])

const radius = d3.scaleOrdinal([8, 25, 20, 8])


const border = (group) => {
    if (group == 'page') {
        return 'red'
    }
    return "blue"
}



const mouseLeave = function (d) {
    // console.log(this.getAttribute('r'))
    // Use D3 to select element, change color and size
    // d3.select(this).attr(
    //     "r", (this.getAttribute('r') * .1)
    // )
    d3.select("text.tooltip").remove('tooltip')
}






export default D3Component;
