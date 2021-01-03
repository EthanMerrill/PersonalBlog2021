

<a href ="https://github.com/strapi/strapi-starter-next-blog">Operational Docs</a>
npm run develop

# Using GraphQL:

# Write your query or mutation here
<a href="https://strapi.io/documentation/developer-docs/latest/plugins/graphql.html#usage">Strapi guide</a>
1. Start GraphQL:
(*assumes Graphql plugin has been installed already)
from within the backend folder run `npm run strapi` 

2. navigate to http://localhost:1337/graphql 
3. get JWT token
```
mutation {
  login(input: { identifier: "EMAIL", password: "PASSWORD" provider:"local"}) {
    jwt
  }
}
```
4. Put token in header:

{"Authorization": "VERYLONGJWTTOKENHERE"}

5. execute queries:

```
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
}
```

TODO:

- [ ] write error handling for newly option fields such as author, image: PersonalBlog2021\frontend\pages\article\[slug].js