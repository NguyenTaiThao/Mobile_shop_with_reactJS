import  React,{Component} from 'react';
import {link, Link} from 'react-router-dom';
import {getImageURL} from '../utils/index'

export default function Items({productDetails}){
    return (
        <div class="product-item card text-center">
        <Link to={`/product-detail/${productDetails && productDetails._id}`}><img src={getImageURL(productDetails)} /></Link>
        <h4><Link to={`/product-detail/${productDetails && productDetails._id}`}>{productDetails && productDetails.name}</Link></h4>
        <p>Giá Bán: <span>{productDetails && Intl.NumberFormat('vn-VN').format(productDetails.price)}đ</span></p>
      </div>
    )
}
