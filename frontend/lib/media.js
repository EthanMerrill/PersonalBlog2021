import { getStrapiURL } from "./api";

export function getStrapiMedia(media) {

  if (media) {
    const imageUrl = media.url.startsWith("/")
    // console.log(`media js imageURL ${imageUrl}`)
      ? getStrapiURL(media.url)
      : media.url;
    return imageUrl;
  } else {
    return false
  }
}
