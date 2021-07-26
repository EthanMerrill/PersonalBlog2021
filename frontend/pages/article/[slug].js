import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import { fetchAPI } from "../../lib/api";
import Image from "../../components/image";
import Seo from "../../components/seo";
import { getStrapiMedia } from "../../lib/media";
import React, {  useEffect } from 'react'


const Article = ({ article, categories }) => {


  // get the time to break the image cache
  var d = new Date();
  var currentTime= d.getTime();

  var bannerClass = `uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin ${currentTime}`

  //by default the url is banner image not found which will return a 404
  var imageUrl = 'banner_image_not_found'
  // if the article image is not null, it will set get the url from the getstrapimedia function
  if (article.image != null) {
    imageUrl = getStrapiMedia(article.image);
  }


  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  };

  if (article.author) {
    console.log("Author  found")

  } else {
    console.log("Author Not found")
  }
  //OPEN ARTICLES AT SCROLL POSITION
  useEffect(()=> {
    window.scrollTo(0,350)
  })
  return (
    <div>
      <Seo seo={seo} />
      <div className="article-wrapper">   

        <div className="centering-container">
          {/* <div
            id="banner"
            className={bannerClass}
            data-src={imageUrl}
            data-srcset={imageUrl}
            data-uk-img = {imageUrl}
            time = {currentTime}
          > */}
          
          
            
          {/* </div> */}
          <Image image = {article.image} className = {bannerClass}>
            <h1>{article.title}</h1>  
          </Image>
          <div className="uk-section">
            <div className="uk-container uk-container-small">
              <ReactMarkdown source={article.content} escapeHtml={false} />
              <hr className="uk-divider-small" />
              <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
                {/* <div>
                  {article.author.picture && (
                    <Image
                      image={article.author.picture}
                      style={{
                        position: "static",
                        borderRadius: "50%",
                        height: 30,
                      }}
                    />
                  )}
                </div> */}
                <div className="uk-width-expand">
                  <p className="uk-margin-remove-bottom">
                    {/* By {article.author.name} */}
                  </p>
                  <p className="uk-text-meta uk-margin-remove-top">
                    <Moment format="MMM Do YYYY">{article.published_at}</Moment>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>  
      </div>
  );
};

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles");

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(
    `/articles?slug=${params.slug}&status=published`
  );
  const categories = await fetchAPI("/categories");

  return {
    props: { article: articles[0], categories },
    revalidate: 1,
  };
}

export default Article;
