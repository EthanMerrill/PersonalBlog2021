
import * as d3 from 'd3';


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


const color = d3.scaleOrdinal([" #4f5d75", "#FFBA08", "green", "orange"])

const radius = d3.scaleOrdinal([50, 25, 20, 8])


const border = (group) => {
    if (group == 'page') {
        return 'red'
    }
    return "blue"
}

const mouseOver = function (d) {
    // console.log(this.getAttribute('r'))
    // Use D3 to select element, change color and size
    d3.select(this).attr(
        "r", (this.getAttribute('r') * 1.1)
    );
}

const mouseLeave = function (d) {
    // console.log(this.getAttribute('r'))
    // Use D3 to select element, change color and size
    d3.select(this).attr(
        "r", (this.getAttribute('r') * .9)
    );
}



class D3Component {

    containerEl;
    props;
    svg;

    constructor(containerEl, props) {
        this.containerEl = containerEl;
        this.props = props;
        const { width, height } = props;
        this.svg = d3.select(containerEl)
            .append('svg')
            .style('background-color', 'white')
            .attr('width', width)
            .attr('height', height);
        this.updateDatapoints();
        this.buildNetwork(props.data, containerEl, this.svg, width, height);
    }

    updateDatapoints = () => {
        const { svg, props: { data, width, height } } = this;
        svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .style('fill', 'red')
            .attr('cx', () => Math.random() * width)
            .attr('cy', () => Math.random() * height)
            .attr('r', 10)
            .on('mouseup', (d, i, nodes) => this.setActiveDatapoint(d, nodes[i]));
    }

    setActiveDatapoint = (d, node) => {
        d3.select(node).style('fill', 'yellow');
        this.props.onDatapointClick(d);
    }

    resize = (width, height) => {
        const { svg } = this;
        svg.attr('width', width)
            .attr('height', height);
        svg.selectAll('circle')
            .attr('cx', () => Math.random() * width)
            .attr('cy', () => Math.random() * height);
    }







    buildNetwork = (data, chartRef, svg, width, height) => {
        console.log(data, chartRef)
        function linkFinder(data) {
            let node_links = []
            nodes.forEach(function linkMaker(nodes) {
                // console.log(nodes.id)

                if (typeof nodes.links !== 'undefined') {
                    // node_links.push(nodes.links)
                    // console.log(nodes.links[0].source)
                    nodes.links.forEach(function linkchecker(onelink) {
                        if (typeof onelink.source == 'undefined') {
                            onelink.source = nodes.id
                        }
                        if (typeof onelink.value == 'undefined') {
                            if (nodes.group == 'page') {
                                onelink.value = 10;
                            } else if (nodes.group == 'subcategory') {
                                onelink.value = 14;
                            } else {
                                onelink.value = 20;
                            }
                        }
                        console.log(onelink.source)
                        node_links.push(onelink)
                    })

                }
            })
            // console.log(node_links)

            return node_links
        }


        const nodes = data.nodes.map(d => Object.create(d));

        const links = linkFinder().map(d => Object.create(d))

        const labelsNodes = data.nodes.map(d => Object.create(d));


        // console.log(data.links.map(d => Object.create(d)))
        // console.log(links2().map(d => Object.create(d)))
        // console.log(links)




        // var width = chartRef.width.animVal.value;
        // var height = document.getElementById('chart').height.animVal.value;
        // var svg = d3.select('svg')
        // width = +svg.attr("width"),
        // height = +svg.attr("height");

        var attractForce = d3.forceManyBody().strength(1).distanceMax(200).distanceMin(10);
        var repelForce = d3.forceManyBody().strength(-250).distanceMax(800).distanceMin(1);

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(linkFinder()).id(d => d.id).distance(function (d) {
                return (d.value) ** 1.9;
            }).strength(0.4))
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
            .attr("xlink:href", function (d) {
                return ("xlink:href", d.url)
            })
            .attr('class', "hyperlink")


        const text = hyperlink.append('text')
            .text(function (d) {
                return d.id;
            })
            .style('fill', '#000')
            .style('font-size', '16px')
            .attr("text-anchor", "middle")
            .attr('x', 0)
            .attr('y', (d => radius(d.group) + 21))

        // const circleOrIcon = hyperlink.append('text')
        //     .attr("class", function(d) {
        //         console.log(d.icons)
        //         if (typeof(d.icon) !== "undefined") {
        //             return icon(d)
        //         } else {
        //             return circle(d)
        //         }
        //     })

        // const icon = node.append('text')
        //     .attr('font-family', 'FontAwesome')
        //     // .attr("class", "fab fa-accessible-icon")
        //     .attr("text-anchor", "middle")
        //     .attr('alignment-baseline', "middle")
        //     .attr('font-size', 25)
        //     .text(function(d) {
        //         return '\uf159'
        //     });
        const circles = hyperlink.append("circle")
            .filter(function (d) {
                return ((d.group == "page") || (d.group == "Ethan"))
            })
            .attr("class", "circle")
            .attr("stroke", d => border(d.group))
            .attr("stroke-width", 1.5)
            .attr("r", d => radius(d.group))
            .attr("fill", d => color(d.group))
            // .attr("fill", "red")
            .attr("opacity", .5)
            .on("mouseover", mouseOver)
            .on("mouseleave", mouseLeave)



        const icons = hyperlink.append('icon')
            // .attr('class', 'handle')
            .attr('font-family', 'FontAwesome')
            .attr("text-anchor", "middle")
            .attr('alignment-baseline', "middle")
            .attr('width', 28)
            .attr('height', 28)
            .attr('x', -10)
            .attr('y', -10)
            .attr("class", d => d.icon)




        simulation.on("tick", () => {
            link

                .attr("x1", d => Math.max(80, Math.min(width - 80, d.source.x)))
                .attr("y1", d => Math.max(radius(d.group), Math.min(height, d.source.y)))
                .attr("x2", d => Math.max(80, Math.min(width - 80, d.target.x)))
                .attr("y2", d => Math.max(radius(d.group), Math.min(height, d.target.y)));
            node
                .attr("transform", d => `translate(${Math.max(radius(d.group), Math.min(width - radius(d.group), d.x))}, ${Math.max(radius(d.group), Math.min(height - radius(d.group), d.y))})`);

        });

        width, height = resize();
        d3.select(window).on("resize", resize);


        function resize() {
            width = window.innerWidth, height = window.innerHeight;
            svg.attr("width", width).attr("height", height);
            // console.log(width, height)
            simulation.force("center", d3.forceCenter(width / 2, height / 2)).restart();
            return svg.attr("width"), svg.attr('height')
        }

        return svg.node();
    };


}

export default D3Component;