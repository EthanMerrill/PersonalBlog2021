import React, { useState, useEffect, useRef } from 'react';
import D3Component from './D3Component';

let vis;
// https://medium.com/@stopyransky/react-hooks-and-d3-39be1d900fb
export default function ForceDirectedNav(props) {
    const [data, setData] = useState(null);
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [active, setActive] = useState(null);
    const refElement = useRef(null);
    useEffect(fetchData, []);
    // useEffect(handleResizeEvent, []);
    useEffect(initVis, [data]);
    useEffect(updateVisOnResize, [width, height]);

    async function fetchData() {
        Promise.resolve(props.data).then((data1) => {
            let tempData = Object.values(data1.data.articles).map(d => {
                let tempArr = d.articles.map(f => { return { "source": d.title, "target": f.title } })

                return ({ "id": d.title, "url": "#", "group": d.category.name, "icon": d.icon, "links": tempArr })
            })
            setData({ "nodes": [...tempData] })
        })
            
    }

    function handleResizeEvent() {
        let resizeTimer;
        console.log("handle resize event called")
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                setWidth(window.innerWidth);
                setHeight(window.innerHeight);
                console.log(width, height)
            }, 300);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }

    function initVis() {

        if (data) {
            const d3Props = {
                data,
                width,
                height,
        };
            // console.log(d3Props.width, d3Props.height)
            vis = new D3Component(refElement.current, d3Props);
        }
    }

    function updateVisOnResize() {
        vis && vis.resize(width, height);
    }

    return (
        <div id='react-world' className='react-world'>
            <div>{active}</div>
            <div id="d3-div" className=" d3-div" ref={refElement} />
        </div>
    );
}






// const ForceDirectedNav = (data) => {
//     const chartRef = useRef(null)

//     useEffect(() => {
//         if (data && chartRef.current) {
//             data = data[Object.keys(data)[0]]
//             let testData = [1, 2, 3]
//             // -----------------------------------

//             const svg = d3.select(chartRef.current);


//             // Bind D3 data
//             const update = svg
//                 .append('g')
//                 .selectAll('rect')
//                 .data(testData);

//             // Enter new D3 elements
//             update.enter()
//                 .append('rect')
//                 .attr('x', (d, i) => i * 25)
//                 .attr('y', 40)
//                 .attr("width", 130)
//                 .attr("height", 160)
//                 .attr("fill", "red")

//             // .text((d: number) => d);

//             // Update existing D3 elements
//             update
//                 .attr('x', (d, i) => i * 40)
//             // .text((d: number) => d);

//             // Remove old D3 elements
//             update.exit()
//                 .remove();

//             //---------------------------------- 

//             const drag = simulation => {

//                 function dragstarted(event) {
//                     if (!event.active) simulation.alphaTarget(.3).restart();
//                     event.subject.fx = event.subject.x;
//                     event.subject.fy = event.subject.y;
//                 }

//                 function dragged(event) {
//                     event.subject.fx = event.x;
//                     event.subject.fy = event.y;
//                 }

//                 function dragended(event) {
//                     if (!event.active) simulation.alphaTarget(0);
//                     event.subject.fx = null;
//                     event.subject.fy = null;
//                 }

//                 return d3.drag()
//                     .on("start", dragstarted)
//                     .on("drag", dragged)
//                     .on("end", dragended);
//             }


//             // buildNetwork(data, chartRef)

//             function buildNetwork(data, chartRef) {

//                 // console.log(data, chartRef)
//                 function linkFinder(data) {
//                     let node_links = []
//                     nodes.forEach(function linkMaker(nodes) {
//                         // console.log(nodes.id)

//                         if (typeof nodes.links !== 'undefined') {
//                             // node_links.push(nodes.links)
//                             // console.log(nodes.links[0].source)
//                             nodes.links.forEach(function linkchecker(onelink) {
//                                 if (typeof onelink.source == 'undefined') {
//                                     onelink.source = nodes.id
//                                 }
//                                 if (typeof onelink.value == 'undefined') {
//                                     if (nodes.group == 'page') {
//                                         onelink.value = 10;
//                                     } else if (nodes.group == 'subcategory') {
//                                         onelink.value = 14;
//                                     } else {
//                                         onelink.value = 20;
//                                     }
//                                 }
//                                 // console.log(onelink.source)
//                                 node_links.push(onelink)
//                             })

//                         }
//                     })
//                     // console.log(node_links)

//                     return node_links
//                 }


//                 const nodes = data.nodes.map(d => Object.create(d));

//                 const links = linkFinder().map(d => Object.create(d))

//                 const labelsNodes = data.nodes.map(d => Object.create(d));


//                 // console.log(data.links.map(d => Object.create(d)))
//                 // console.log(links2().map(d => Object.create(d)))
//                 // console.log(links)




//                 // var width = chartRef.width.animVal.value;
//                 // var height = document.getElementById('chart').height.animVal.value;
//                 let width = 500
//                 let height = 500
//                 const svg = d3.select(chartRef.current);
//                 // var svg = d3.select('svg')
//                 // width = +svg.attr("width"),
//                 // height = +svg.attr("height");

//                 var attractForce = d3.forceManyBody().strength(1).distanceMax(200).distanceMin(10);
//                 var repelForce = d3.forceManyBody().strength(-250).distanceMax(800).distanceMin(1);

//                 const simulation = d3.forceSimulation(nodes)
//                     .force("link", d3.forceLink(linkFinder()).id(d => d.id).distance(function (d) {
//                         return (d.value) ** 1.9;
//                     }).strength(0.4))
//                     .force("charge", d3.forceManyBody())
//                     .force("attractForce", attractForce)
//                     .force("repelForce", repelForce)
//                     .velocityDecay(.12);

//                 // .force("center", d3.forceCenter(100 / 2, 100 / 2));

//                 const link = svg.append("g")
//                     .attr("class", "links")
//                     .attr("stroke", "#999")
//                     .attr("stroke-opacity", 0.6)
//                     .selectAll("line")
//                     .data(links)
//                     .join("line")
//                     .attr("stroke-width", d => Math.sqrt(d.value));

//                 const node = svg.append('g')
//                     .attr('class', "nodes")
//                     .selectAll(".node")
//                     .data(nodes)
//                     .join('g')
//                     .attr("class", "node")
//                     .call(drag(simulation));

//                 var hyperlink = node.append("svg:a")
//                     // .text(function(d) {
//                     //     return d.id;
//                     // })
//                     .attr("xlink:href", function (d) {
//                         return ("xlink:href", d.url)
//                     })
//                     .attr('class', "hyperlink")


//                 const text = hyperlink.append('text')
//                     .text(function (d) {
//                         return d.id;
//                     })
//                     .style('fill', '#000')
//                     .style('font-size', '16px')
//                     .attr("text-anchor", "middle")
//                     .attr('x', 0)
//                     .attr('y', (d => radius(d.group) + 21))

//                 // const circleOrIcon = hyperlink.append('text')
//                 //     .attr("class", function(d) {
//                 //         console.log(d.icons)
//                 //         if (typeof(d.icon) !== "undefined") {
//                 //             return icon(d)
//                 //         } else {
//                 //             return circle(d)
//                 //         }
//                 //     })

//                 // const icon = node.append('text')
//                 //     .attr('font-family', 'FontAwesome')
//                 //     // .attr("class", "fab fa-accessible-icon")
//                 //     .attr("text-anchor", "middle")
//                 //     .attr('alignment-baseline', "middle")
//                 //     .attr('font-size', 25)
//                 //     .text(function(d) {
//                 //         return '\uf159'
//                 //     });
//                 const circles = hyperlink.append("circle")
//                     .filter(function (d) {
//                         return ((d.group == "page") || (d.group == "Ethan"))
//                     })
//                     .attr("class", "circle")
//                     .attr("stroke", d => border(d.group))
//                     .attr("stroke-width", 1.5)
//                     .attr("r", d => radius(d.group))
//                     .attr("fill", d => color(d.group))
//                     // .attr("fill", "red")
//                     .attr("opacity", .5)
//                     .on("mouseover", mouseOver)
//                     .on("mouseleave", mouseLeave)



//                 const icons = hyperlink.append('icon')
//                     // .attr('class', 'handle')
//                     .attr('font-family', 'FontAwesome')
//                     .attr("text-anchor", "middle")
//                     .attr('alignment-baseline', "middle")
//                     .attr('width', 28)
//                     .attr('height', 28)
//                     .attr('x', -10)
//                     .attr('y', -10)
//                     .attr("class", d => d.icon)




//                 simulation.on("tick", () => {
//                     link

//                         .attr("x1", d => Math.max(80, Math.min(width - 80, d.source.x)))
//                         .attr("y1", d => Math.max(radius(d.group), Math.min(height, d.source.y)))
//                         .attr("x2", d => Math.max(80, Math.min(width - 80, d.target.x)))
//                         .attr("y2", d => Math.max(radius(d.group), Math.min(height, d.target.y)));
//                     node
//                         .attr("transform", d => `translate(${Math.max(radius(d.group), Math.min(width - radius(d.group), d.x))}, ${Math.max(radius(d.group), Math.min(height - radius(d.group), d.y))})`);

//                 });

//                 width, height = resize();
//                 d3.select(window).on("resize", resize);


//                 function resize() {
//                     width = window.innerWidth, height = window.innerHeight;
//                     svg.attr("width", width).attr("height", height);
//                     // console.log(width, height)
//                     simulation.force("center", d3.forceCenter(width / 2, height / 2)).restart();
//                     return svg.attr("width"), svg.attr('height')
//                 }

//                 return svg.node();
//             };



//             let color = d3.scaleOrdinal([" #4f5d75", "#FFBA08", "green", "orange"])

//             let radius = d3.scaleOrdinal([50, 25, 20, 8])

//             function border(group) {
//                 if (group == 'page') {
//                     return 'red'
//                 }
//                 return "blue"
//             }

//             let mouseOver = function (d) {
//                 // console.log(this.getAttribute('r'))
//                 // Use D3 to select element, change color and size
//                 d3.select(this).attr(
//                     "r", (this.getAttribute('r') * 1.1)
//                 );
//             }

//             let mouseLeave = function (d) {
//                 // console.log(this.getAttribute('r'))
//                 // Use D3 to select element, change color and size
//                 d3.select(this).attr(
//                     "r", (this.getAttribute('r') * .9)
//                 );
//             }

















//         }
//     }, [data, useRef.current])



//     return (
//         <div id="chart" className="d3-chart" ref={chartRef}>

//         </div>)
// }

































// buildNetwork(data[Object.keys(data)[0]], chartRef)
//     // console.log(data)
//     // d3.json(data[Object.keys(data)[0]]).then(function (data) {
//     //     console.log(data[Object.keys(data)[0]])
//     //     buildNetwork(data)
//     // }).catch(function (err) {
//     //     console.log(err)
//     // })


//     let drag = simulation => {

//         function dragstarted(event) {
//             if (!event.active) simulation.alphaTarget(.3).restart();
//             event.subject.fx = event.subject.x;
//             event.subject.fy = event.subject.y;
//         }

//         function dragged(event) {
//             event.subject.fx = event.x;
//             event.subject.fy = event.y;
//         }

//         function dragended(event) {
//             if (!event.active) simulation.alphaTarget(0);
//             event.subject.fx = null;
//             event.subject.fy = null;
//         }

//         return d3.drag()
//             .on("start", dragstarted)
//             .on("drag", dragged)
//             .on("end", dragended);
//     }



//     function buildNetwork(data, chartRef) {
//         console.log(data, chartRef)
//         function linkFinder(data) {
//             let node_links = []
//             nodes.forEach(function linkMaker(nodes) {
//                 // console.log(nodes.id)

//                 if (typeof nodes.links !== 'undefined') {
//                     // node_links.push(nodes.links)
//                     // console.log(nodes.links[0].source)
//                     nodes.links.forEach(function linkchecker(onelink) {
//                         if (typeof onelink.source == 'undefined') {
//                             onelink.source = nodes.id
//                         }
//                         if (typeof onelink.value == 'undefined') {
//                             if (nodes.group == 'page') {
//                                 onelink.value = 10;
//                             } else if (nodes.group == 'subcategory') {
//                                 onelink.value = 14;
//                             } else {
//                                 onelink.value = 20;
//                             }
//                         }
//                         console.log(onelink.source)
//                         node_links.push(onelink)
//                     })

//                 }
//             })
//             // console.log(node_links)

//             return node_links
//         }


//         const nodes = data.nodes.map(d => Object.create(d));

//         const links = linkFinder().map(d => Object.create(d))

//         const labelsNodes = data.nodes.map(d => Object.create(d));


//         // console.log(data.links.map(d => Object.create(d)))
//         // console.log(links2().map(d => Object.create(d)))
//         // console.log(links)




//         var width = chartRef.width.animVal.value;
//         var height = document.getElementById('chart').height.animVal.value;
//         var svg = d3.select('svg')
//         // width = +svg.attr("width"),
//         // height = +svg.attr("height");

//         var attractForce = d3.forceManyBody().strength(1).distanceMax(200).distanceMin(10);
//         var repelForce = d3.forceManyBody().strength(-250).distanceMax(800).distanceMin(1);

//         const simulation = d3.forceSimulation(nodes)
//             .force("link", d3.forceLink(linkFinder()).id(d => d.id).distance(function (d) {
//                 return (d.value) ** 1.9;
//             }).strength(0.4))
//             .force("charge", d3.forceManyBody())
//             .force("attractForce", attractForce)
//             .force("repelForce", repelForce)
//             .velocityDecay(.12);

//         // .force("center", d3.forceCenter(100 / 2, 100 / 2));

//         const link = svg.append("g")
//             .attr("class", "links")
//             .attr("stroke", "#999")
//             .attr("stroke-opacity", 0.6)
//             .selectAll("line")
//             .data(links)
//             .join("line")
//             .attr("stroke-width", d => Math.sqrt(d.value));

//         const node = svg.append('g')
//             .attr('class', "nodes")
//             .selectAll(".node")
//             .data(nodes)
//             .join('g')
//             .attr("class", "node")
//             .call(drag(simulation));

//         var hyperlink = node.append("svg:a")
//             // .text(function(d) {
//             //     return d.id;
//             // })
//             .attr("xlink:href", function (d) {
//                 return ("xlink:href", d.url)
//             })
//             .attr('class', "hyperlink")


//         const text = hyperlink.append('text')
//             .text(function (d) {
//                 return d.id;
//             })
//             .style('fill', '#000')
//             .style('font-size', '16px')
//             .attr("text-anchor", "middle")
//             .attr('x', 0)
//             .attr('y', (d => radius(d.group) + 21))

//         // const circleOrIcon = hyperlink.append('text')
//         //     .attr("class", function(d) {
//         //         console.log(d.icons)
//         //         if (typeof(d.icon) !== "undefined") {
//         //             return icon(d)
//         //         } else {
//         //             return circle(d)
//         //         }
//         //     })

//         // const icon = node.append('text')
//         //     .attr('font-family', 'FontAwesome')
//         //     // .attr("class", "fab fa-accessible-icon")
//         //     .attr("text-anchor", "middle")
//         //     .attr('alignment-baseline', "middle")
//         //     .attr('font-size', 25)
//         //     .text(function(d) {
//         //         return '\uf159'
//         //     });
//         const circles = hyperlink.append("circle")
//             .filter(function (d) {
//                 return ((d.group == "page") || (d.group == "Ethan"))
//             })
//             .attr("class", "circle")
//             .attr("stroke", d => border(d.group))
//             .attr("stroke-width", 1.5)
//             .attr("r", d => radius(d.group))
//             .attr("fill", d => color(d.group))
//             // .attr("fill", "red")
//             .attr("opacity", .5)
//             .on("mouseover", mouseOver)
//             .on("mouseleave", mouseLeave)



//         const icons = hyperlink.append('icon')
//             // .attr('class', 'handle')
//             .attr('font-family', 'FontAwesome')
//             .attr("text-anchor", "middle")
//             .attr('alignment-baseline', "middle")
//             .attr('width', 28)
//             .attr('height', 28)
//             .attr('x', -10)
//             .attr('y', -10)
//             .attr("class", d => d.icon)




//         simulation.on("tick", () => {
//             link

//                 .attr("x1", d => Math.max(80, Math.min(width - 80, d.source.x)))
//                 .attr("y1", d => Math.max(radius(d.group), Math.min(height, d.source.y)))
//                 .attr("x2", d => Math.max(80, Math.min(width - 80, d.target.x)))
//                 .attr("y2", d => Math.max(radius(d.group), Math.min(height, d.target.y)));
//             node
//                 .attr("transform", d => `translate(${Math.max(radius(d.group), Math.min(width - radius(d.group), d.x))}, ${Math.max(radius(d.group), Math.min(height - radius(d.group), d.y))})`);

//         });

//         width, height = resize();
//         d3.select(window).on("resize", resize);


//         function resize() {
//             width = window.innerWidth, height = window.innerHeight;
//             svg.attr("width", width).attr("height", height);
//             // console.log(width, height)
//             simulation.force("center", d3.forceCenter(width / 2, height / 2)).restart();
//             return svg.attr("width"), svg.attr('height')
//         }

//         return svg.node();
//     };



//     let color = d3.scaleOrdinal([" #4f5d75", "#FFBA08", "green", "orange"])

//     let radius = d3.scaleOrdinal([50, 25, 20, 8])

//     function border(group) {
//         if (group == 'page') {
//             return 'red'
//         }
//         return "blue"
//     }

//     let mouseOver = function (d) {
//         // console.log(this.getAttribute('r'))
//         // Use D3 to select element, change color and size
//         d3.select(this).attr(
//             "r", (this.getAttribute('r') * 1.1)
//         );
//     }

//     let mouseLeave = function (d) {
//         // console.log(this.getAttribute('r'))
//         // Use D3 to select element, change color and size
//         d3.select(this).attr(
//             "r", (this.getAttribute('r') * .9)
//         );
//     }