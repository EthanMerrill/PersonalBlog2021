import { Children } from "react";
import { getStrapiMedia } from "../lib/media";

const Image = ({ image, style, children }) => {

  try {
    const imageUrl = getStrapiMedia(image);
    console.log(`IMAGE URL IN image.js: ${imageUrl}`)
    if (imageUrl == false) {
      return (<div className="image-not-found"></div>)
    } else {
      return (
        <div>
        <img
          src={imageUrl}
          alt={image.alternativeText || image.name}
          style={style}
        />
        {children}
        </div>
      );

    }
    
  } catch {
    console.log(`Error in the Image Component image passed: ${image}`)
    return (<div className="image-not-found"></div>)
  }
  
};

export default Image;
