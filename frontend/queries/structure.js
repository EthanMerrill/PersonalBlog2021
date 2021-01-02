
import gql from "graphql-tag";

const ARTICLE_QUERY = gql`
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
  }`;

export default ARTICLE_QUERY