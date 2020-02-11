import React, { Component } from 'react';
import * as API from '../services/api';
import _ from 'lodash';
import {Items} from '../components'
import Loading from './Layout/Loading'

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      featurePrdData:[],
      lastestPrdData:[],
      loading:true
    }
  }
  componentDidMount(){
    this.getProduct()
    const { location } = this.props
    const query = new URLSearchParams(location.search);
    const queryString = query.get('query')
  }
  async getProduct(){
    try{
      const [featurePrd, lastestPrd] = await Promise.all([
        API.getFeaturedProducts({limit:6}),
        API.getLastestProducts({limit:6})
      ])
      const featurePrdData = _.get(featurePrd,'data.data')
      const lastestPrdData = _.get(lastestPrd, 'data.data')
      this.setState({featurePrdData,lastestPrdData, loading:false})
    }catch(error){
      console.log(error)
    }
  }
  render() {
    const {featurePrdData,lastestPrdData,loading} = this.state
    return (
      <>
        <div class="products">
          {!loading && <h3>Sản phẩm nổi bật</h3>}
            <Loading loading={this.state.loading}/>
            <div class="product-list card-deck">
              {featurePrdData.map((data,key) => <Items key={key} productDetails={data}/>)}
            </div>
        </div>
        <div class="products">
        {!loading && <h3>Sản phẩm mới nhất</h3>}
          <div class="product-list card-deck">
            {lastestPrdData.map((data,key) => <Items key={key} productDetails={data}/>)}
          </div>
      </div>
    </>
    );
  }
}

export default Header;
