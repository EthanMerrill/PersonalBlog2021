import { getStrapiMedia } from "../lib/media";

const Image = ({ image, style }) => {

  try {
    const imageUrl = getStrapiMedia(image);
    if (imageUrl = false) {
      console.log("image not found")
    }
    
  } catch {
    return (<div className="image-not-found"></div>)
  }
  return (
    <img
      src={imageUrl}
      alt={image.alternativeText || image.name}
      style={style}
    />
  );
};

export default Image;
