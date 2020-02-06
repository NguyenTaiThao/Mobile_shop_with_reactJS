import React, {Component} from 'react'
import _ from 'lodash'
import * as API from '../services/api'
import {Items} from '../components/index'

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            queryString:''
        }
    }
    componentDidMount(){
        this.getTargetData()
    }
    componentDidUpdate(prevProps, prevState){
        const prevQuery = new URLSearchParams(prevProps.location.search)
        const prevQueryString = prevQuery.get('query')

        const currQuery = new URLSearchParams(this.props.location.search)
        const currQueryString = currQuery.get('query')

        if(prevQueryString !== currQueryString){
            this.getTargetData(currQueryString)
        }
    }
    async getTargetData(newQuery){
        const {location} = this.props
        const query = new URLSearchParams(location.search)
        const queryString = query.get('query')
        this.setState({
            queryString:queryString
        })
        try{
            const result  = await API.getProductByName({name:(newQuery||queryString)})
            this.setState({
                resultList: _.get(result, 'data.data', [])
            })
        }catch(error){
            console.log(error.message)
        }
    }
    render(){
        const resultList = this.state.resultList
        return(
            <>
                <div class="products">
                    <div id="search-result">Kết quả tìm kiếm với sản phẩm <span>iPhone Xs Max 2 Sim - 256GB</span></div>
                    <div class="product-list card-deck">
                        {resultList && resultList.map((data,key) => <Items productDetails={data} key={data._id}/>)}  
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
        )
    }
}

export default Search