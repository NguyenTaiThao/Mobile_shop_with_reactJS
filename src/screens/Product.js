import React, { Component } from 'react';
import * as API from '../services/api';
import _ from "lodash";
import {getImageURL} from '../utils'
import moment, { defaultFormat } from 'moment';
import {addCart} from '../actions/cartAction'
import {connect} from 'react-redux'

const defaultCommentData = {
  name:'',
  email:'',
  content:''
}
class Product extends Component {
  constructor(props){
    super(props)
    this.state = {
      formData: defaultCommentData,
      name:''
    }
  }
  componentDidMount(){   
    this.getProductDetail()
    this.getCommentList()
  }
  async getProductDetail(){
    const {match} = this.props
    const productID = _.get(match, 'params.productId')
    try{
      const productDetail = await API.getProductDetails(productID)
      this.setState({
        productDetail:productDetail.data.data
      })
    }catch(error){
      console.log(error)
    }
  }

  async getCommentList(){
    const {match} = this.props
    const productID = _.get(match, 'params.productId')
    try{
      const commentList = await API.getProductComments(productID)
      this.setState ({
        commentList:commentList.data.data
      })
    }catch(error){
      console.log(error)
    }
  }
  getNewComment(event,type){
    const {formData} = this.state
    this.setState({
        formData:{
        ...formData,
        [type]:event.target.value
        }
    })
  }
  addCart = (productDetail) => {
    const {dispatchAddCart, history} = this.props
    console.log('pushed')
    dispatchAddCart({...productDetail, quantity:1})
    history.push('/cart')
  }
  async submitNewComment(){
    const {formData} = this.state
    const {match} = this.props
    const id  = _.get(match, 'params.productId')
    try{
        const result = await API.createNewComment({ ...formData, productId:id})
        
        this.getCommentList()
        this.setState({
            formData:defaultCommentData
        })
    }catch(error){
        console.log(error)
    }
  }

  render() {
    const {productDetail, commentList, formData} = this.state
    const isStock = productDetail && productDetail.is_stock ? 'Còn hàng' : 'Hết hàng'
    // console.log('ffff', formData)
    return (
      <>
        <div id="product">
                	<div id="product-head" class="row">
                    	<div id="product-img" class="col-lg-6 col-md-6 col-sm-12">
                        	<img src={`${getImageURL(productDetail&&productDetail)}`}/>
                        </div>
                        <div id="product-details" class="col-lg-6 col-md-6 col-sm-12">
                        <h1>{productDetail&&productDetail.name}</h1>
                            <ul>
                            	<li><span>Bảo hành:</span> 12 Tháng</li>
                                <li><span>Đi kèm:</span> {productDetail&&productDetail.accessories}</li>
                                <li><span>Tình trạng:</span> {productDetail&&productDetail.status}</li>
                                <li><span>Khuyến Mại:</span> {productDetail&&productDetail.promotion}</li>
                                <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                                <li id="price-number">{productDetail&&productDetail.price}đ</li>
                                <li id="status">{isStock}</li>
                            </ul>
                            <div id="add-cart"><a href="" onClick={() => this.addCart(productDetail)}>Mua ngay</a></div>
                        </div>
                    </div>
                    <div id="product-body" class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                        <h3>Đánh giá về {productDetail && productDetail.name}</h3>
                            <p>
                                {productDetail && productDetail.details}  
                            </p>
                        </div>
                    </div>
                    <div id="comment" class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <h3>Bình luận sản phẩm</h3>
                            <form method="post" onSubmit={(e) => {e.preventDefault()}}>
                                <div class="form-group">
                                    <label>Tên:</label>
                                    <input name="comm_name" required type="text" class="form-control" onChange={(event) => this.getNewComment(event,'name')} value={formData && formData.name}/>
                                </div>
                                <div class="form-group">
                                    <label>Email:</label>
                                    <input name="comm_mail" required type="email" class="form-control" id="pwd" onChange={(event) => this.getNewComment(event,'email')} value={formData && formData.email}/>
                                </div>
                                <div class="form-group">
                                    <label>Nội dung:</label>
                                    <textarea name="comm_details" required rows="8" class="form-control" onChange={(event) => this.getNewComment(event,'content')} value={formData && formData.content}></textarea>     
                                </div>
                                <button type="submit" name="sbm" class="btn btn-primary" onClick={() => this.submitNewComment()}>Gửi</button>
                            </form> 
                        </div>
                    </div>
                    <div id="comments-list" class="row">
                    	<div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="comment-item">
                                {commentList && commentList.map((value, key) => 
                                  (
                                    <ul>
                                        <li><b>{value && value.name}</b></li>
                                        <li>{moment(value && value.updated_date).format('DD-MM-YYYY hh:mm')}</li>
                                        <li>
                                            <p>{value && value.content}</p>
                                        </li>
                                    </ul>
                                  )
                                )}
                                
                            </div>
                        </div>
                    </div>
                </div>
        <div id="pagination">
            <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#">Trang trước</a></li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Trang sau</a></li>
            </ul> 
        </div>       
      </>
    );
  }
}
function mapStateToProps(state){
  return {
    cart:state.cartReducer.cart
  }
}
function mapDispatchToProps(dispatch){
  return{
    dispatchAddCart: (product) => dispatch(addCart(product))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);
