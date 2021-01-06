import React, { useState, useEffect, useRef } from 'react';
import D3Component from './D3Component';
import ApolloClientInterface from "../lib/apolloClient"
import ApolloClient from "apollo-client";
import { GraphQLInputObjectType } from 'graphql';
let vis;
// https://medium.com/@stopyransky/react-hooks-and-d3-39be1d900fb
export default function ForceDirectedNav(props) {

    const APCI = new ApolloClientInterface("http://localhost:1337/graphql")
    let graphData = APCI.query(`
            query{
                articles{
                  title
                  id
                  icon
                  ExtLink
                  description
                  category{
                    name
                  }
                  articles {
                    title
                  }
                }
              }`).then(result => { return result })




    const [data, setData] = useState(null);
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [active, setActive] = useState(null);
    const refElement = useRef(null);
    useEffect(fetchData, []);
    // useEffect(handleResizeEvent, []);
    useEffect(initVis, [data]);
    // useEffect(updateVisOnResize, [width, height]);

    function fetchData() {
        Promise.resolve(graphData).then((data1) => {
            let tempData = Object.values(data1.data.articles).map(d => {
                let tempArr = d.articles.map(f => { return { "source": d.title, "target": f.title } })
                return ({ "id": d.title, "url": d.ExtLink, "group": d.category.name, "icon": d.icon, "description": d.description, "links": tempArr })
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

    // function updateVisOnResize() {
    //     if (vis) {
    //         console.log(vis)
    //         vis && vis.buildNetwork.resize();
    //     }

    // }

    return (
        <div id='react-world' className='react-world'>
            <div>{active}</div>
            <div id="d3-div" className=" d3-div" ref={refElement} />
        </div>
    );
}

