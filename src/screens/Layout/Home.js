import React, { Component } from 'react';
import * as API from '../../services/api';
import _ from 'lodash';
import {Items} from '../../components'
class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      featurePrdData:[],
      lastestPrdData:[]
    }
  }
  componentDidMount(){
    this.getProduct()
  }
  async getProduct(){
    try{
      const [featurePrd, lastestPrd] = await Promise.all([
        API.getFeaturedProducts({limit:6}),
        API.getLastestProducts({limit:6})
      ])
      const featurePrdData = _.get(featurePrd,'data.data')
      const lastestPrdData = _.get(lastestPrd, 'data.data')
      this.setState({featurePrdData,lastestPrdData})
      // console.log(this.state.featurePrdData)
      // console.log(this.state.lastestPrdData)
    }catch(error){
      console.log(error)
    }
  }
  render() {
    return (
      <>
        <div class="products">
          <h3>Sản phẩm nổi bật</h3>
            <div class="product-list card-deck">
              {this.state.featurePrdData.map((data,key) => <Items key={key} productDetails={data}/>)}
            </div>
        </div>
        <div class="products">
        <h3>Sản phẩm mới nhất</h3>
          <div class="product-list card-deck">
            {this.state.lastestPrdData.map((data,key) => <Items key={key} productDetails={data}/>)}
          </div>
      </div>
    </>
    );
  }
}

export default Header;
