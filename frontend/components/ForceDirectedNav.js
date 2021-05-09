import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import D3Component from './D3Component';
import ApolloClientInterface from "../lib/apolloClient"
import ApolloClient from "apollo-client";
import { GraphQLInputObjectType } from 'graphql';
import Link from "next/link";
import {useRouter} from 'next/router'
let vis;
// https://medium.com/@stopyransky/react-hooks-and-d3-39be1d900fb
export default function ForceDirectedNav({articles}) {

    // const APCI = new ApolloClientInterface(`https://ethanmerrillwebsite.ue.r.appspot.com/graphql`)
    // console.log(APCI)
    // let graphData = APCI.query(`
    //         query{
    //             articles{
    //               title
    //               id
    //               icon
    //               ExtLink
    //               description
    //               slug
    //               status
    //               category{
    //                 name
    //               }
    //               articles {
    //                 title
    //               }
    //             }
    //           }`).then(result => { return result })

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


    const router = useRouter()
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [active, setActive] = useState(null);
    const refElement = useRef(null);
    // useEffect(reformatData, []);
    // useEffect(handleResizeEvent, []);
    var vis = useEffect(initVis, []);
    useEffect(updateVisOnResize, [width, height]);

    const size = useWindowSize();

// Hook : https://stackoverflow.com/questions/63406435/how-to-detect-window-size-in-next-js-ssr-using-react-hook
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== 'undefined') {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          })
          setWidth(window.innerWidth);
          setHeight(window.innerHeight);;
        }
      
        // Add event listener
        window.addEventListener("resize", handleResize);
       
        // Call handler right away so state gets updated with initial window size
        handleResize();
      
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    // console.log(windowSize)
    return windowSize;
  }


    function initVis() {
        console.log('initVis', width,height)
        // handleResizeEvent()

            console.log(width, height)
            vis = new D3Component(refElement.current, articles, height, width, router);

        }
    function updateVisOnResize() {
        if (vis) {
            console.log(vis)
            // vis.resize(height, width, refElement.current)
            // vis && vis.buildNetwork.resize();
        }

    }

    return (
        <div className = "background-nav">
              <Link href="/">
                <a className="name-homebutton"><h1>Ethan Merrill</h1></a>
              </Link>
              
            <div id='react-world' className='react-world'>
                <script src="https://kit.fontawesome.com/374cfc1460.js" crossOrigin="anonymous"></script>
 
                {/* <div>{active}</div> */}
                
                <div id="d3-div" className=" d3-div" ref={refElement}></div>
            </div>
            <div className='top-offset-block'></div>
        </div>
    );
}

