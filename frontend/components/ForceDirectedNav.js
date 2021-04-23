import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import D3Component from './D3Component';
import ApolloClientInterface from "../lib/apolloClient"
import ApolloClient from "apollo-client";
import { GraphQLInputObjectType } from 'graphql';
import Link from "next/link";
let vis;
// https://medium.com/@stopyransky/react-hooks-and-d3-39be1d900fb
export default function ForceDirectedNav(props) {

    const APCI = new ApolloClientInterface(`https://ethanmerrillwebsite.ue.r.appspot.com/graphql`)
    // console.log(APCI)
    let graphData = APCI.query(`
            query{
                articles{
                  title
                  id
                  icon
                  ExtLink
                  description
                  slug
                  status
                  category{
                    name
                  }
                  articles {
                    title
                  }
                }
              }`).then(result => { return result })

        // Scroll detection code: https://dev.to/chriseickemeyergh/building-custom-scroll-animations-using-react-hooks-4h6f
    const ourRef = useRef(null);
// https://dev.to/adrien/creating-a-custom-react-hook-to-get-the-window-s-dimensions-in-next-js-135k
// Need to do whats in this article because when using static rendering with nextjs things go weird



    useLayoutEffect(() => {
        const topPosition = refElement.current.getBoundingClientRect().top;
        const onScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        if(topPosition < scrollPosition) { 
        // trigger animation if anything is scolled at all
        }
        if (scrollPosition>1000){
            document.getElementById("react-world").classList.add("blur")
        } 
        if (scrollPosition<1000){
            document.getElementById("react-world").classList.remove("blur")
        }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
        /* 
        remove the event listener in the cleanup function 
        to prevent memory leaks
        */
    }, []);

    // call the d3 rezize function when the window is resized:
    // useLayoutEffect(() => {
    //     const onResize = () => {
    //         console.log(vis.svg)
    //         vis.testFunction(vis.svg)
    //     }
    //            // d3.select(window).on("resize", resize());
    //     window.addEventListener("resize", onResize);
    //     return () => window.removeEventListener("resize", onResize)
    // })



    const [data, setData] = useState(null);
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [active, setActive] = useState(null);
    const refElement = useRef(null);
    useEffect(fetchData, []);
    // useEffect(handleResizeEvent, []);
    var vis = useEffect(initVis, [data]);
    // useEffect(updateVisOnResize, [width, height]);

    function fetchData() {
        Promise.resolve(graphData).then((data1) => {
            let tempData = Object.values(data1.data.articles).map(d => {
                let tempArr = d.articles.map(f => { return { "source": d.title, "target": f.title } })
                    return ({ "id": d.title, "url": d.ExtLink, "group": d.category.name, "icon": d.icon, "description": d.description, "links": tempArr , "slug":d.slug, "status":d.status})
            })
            // console.log(...tempData)
            var publishedArticles = tempData.filter(node => node.status == "published")
            setData({ "nodes": [...publishedArticles] })
        })
            
    }

    function handleResizeEvent() {
        let resizeTimer;
        // console.log("handle resize event called")
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                setWidth(window.innerWidth);
                setHeight(window.innerHeight);
                // console.log(width, height)
            }, 300);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }

    function initVis() {
        // handleResizeEvent()
        // console.log(width)
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

    // function updateVisOnResize() {
    //     if (vis) {
    //         console.log(vis)
    //         vis && vis.buildNetwork.resize();
    //     }

    // }

    return (
        <div className = "background-nav">
              <Link href="/">
                <a className="name-homebutton"><h1>Ethan Merrill</h1></a>
              </Link>
            <div id='react-world' className='react-world'>
                <script src="https://kit.fontawesome.com/374cfc1460.js" crossOrigin="anonymous"></script>
 
                <div>{active}</div>
                <div id="d3-div" className=" d3-div" ref={refElement}></div>
            </div>
        </div>
    );
}

