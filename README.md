

# Ethan's Portfolio 

A website built to showcase Ethan's projects and achievements. Technology used: Strapi CMS with graphql querying hosted on google app engine with a CI/CD connected to github. Frontend: Nextjs hosted and compiled by Vercel. D3 is used for the interactive force directed navigation function.

Currently the force-directed nav is rebuilt with a query to the app engine every time the site is visited, so it takes a very long time to load because the app engine must spin up an instance each time the site is visited. Fix coming!

<a href='https://personal-blog2021.vercel.app/'>Site Here</a> 

TODO:


- [x] Add a persistent home button to the nav via the force directed nav component
- [x] figure out why icons disappear on everything but home page
- [ ] Working post pages.
    - [ ] write error handling for newly optional fields such as author, image PersonalBlog2021\frontend\pages\article\[slug].js
- [x] Routing in the force directed nav.
- [x] force directed graph tooltips with a description of the article 
- [x] setup free server-less hosting on AWS or gcloud depending on which is more free
- [ ] make tooltips the card component
- [ ] Make the force directed nav change when screen size changes. Use case: phone rotates, window resized. 
- [ ] change opacity and size of nodes based on publish date distance from today
- [ ] add a intro usability guide
- [ ] if photo, put title above
- [ ] make a mobile navigation option (the site doesn't really work on mobile at the moment)
- [ ] Modify nav query so that it is only needed at next build time, not at every site visit. Something to do with site re-hydration, static optimization, and getInitialProps in pages/_app