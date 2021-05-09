import { getStrapiMedia } from "../lib/media";

const Image = ({ image, style }) => {

  try {
    const imageUrl = getStrapiMedia(image);
    if (imageUrl == false) {
      return (<div className="image-not-found"></div>)
    } else {
      return (
        <img
          src={imageUrl}
          alt={image.alternativeText || image.name}
          style={style}
        />
      );

    }
    
  } catch {
    return (<div className="image-not-found"></div>)
  }
  
};

export default Image;
