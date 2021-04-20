import React from "react";
import Head from 'next/head'
import Articles from "../components/articles";
import Layout from "../components/layout";
import Seo from "../components/seo";

import { fetchAPI } from "../lib/api";
// import graphData from "../assets/graphData"
// import { ApolloProvider } from "react-apollo";
// import { ApolloProvider } from '@apollo/client';

// import { ApolloLink } from "@apollo/client";
// import Query from "../components/query"
// import NAVQUERY from "../queries/structure"


const Home = ({ articles, categories, homepage }) => {

  console.log( articles, categories, homepage)

  return (
    <div>

      {/* <ApolloProvider client={client}> */}
      {/* <Query query={NAVQUERY}></Query> */}
      {/* </ApolloProvider> */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"></link>

        <script src="https://kit.fontawesome.com/374cfc1460.js" crossorigin="anonymous"></script>
      </Head>
      <Layout categories={categories} > 
      <Seo seo={homepage.seo} />

      <div className="uk-section">
          <div className="uk-navbar-container uk-navbar">
          <h1>{homepage.hero.title}</h1>
          <Articles articles={articles} />
        </div>
      </div>
      </Layout>

    </div >
  );
};

export async function getStaticProps() {
    // Run API calls in parallel
    const [articles, categories, homepage] = await Promise.all([
        fetchAPI("/articles?status=published"),
        fetchAPI("/categories"),
        fetchAPI("/homepage"),
    ]);

    return {
        props: { articles, categories, homepage },
        revalidate: 1,
    };
}

export default Home;