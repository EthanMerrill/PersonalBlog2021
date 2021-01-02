


// https://www.apollographql.com/docs/react/get-started/
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: `http://localhost:1337/graphql`,
    cache: new InMemoryCache()
});


// const client = ...

client
    .query({
        query: gql`
        query{
            articles{
                  title
              id
              category{
                name
              }
              articles {
                title
              }
            }
          }`
    })
    .then(result => console.log(result.data.articles));

