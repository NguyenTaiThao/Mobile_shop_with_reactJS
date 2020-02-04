import  baseURL from '../services/config';

export function getImageURL(productDetails){
    const imageName = productDetails && productDetails.image && productDetails.image.replace('uploads/', '')
    return `${baseURL.devURL}/${imageName}`
}