import baseURL from "./config"
import {create} from 'apisauce'

const api = create({
    baseURL:`${baseURL.devURL}`,
    Headers:{
        Accept:'application/json',
        'Content-type':'application/json',
        Cache:'no-cache'
    },
    withCredentials:true,
    timeout:30000
});
export function getFeaturedProducts(params){return api.get('/get-products?isFeatured=true',params);}
export function getLastestProducts(params){return api.get('/get-products?isFeatured=false', params);}
export function getProductDetails(idProduct,params={}){return api.get(`/product/${idProduct}`,params);}
export function getProductComments(idProduct, params={}){return api.get(`/get-product-comments/${idProduct}`,params);}
export function createNewComment(params){return api.post(`/create-comment`, params);}
export function getProductByName(params){ return api.get(`/get-products`, params);}

