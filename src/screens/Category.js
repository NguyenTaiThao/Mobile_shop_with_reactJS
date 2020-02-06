import React,{Component} from 'react'
import {Items} from '../components/index'
import _ from 'lodash'
import * as API from '../services/api'
class Category extends Component{
    constructor(props){
        super(props)
        this.state ={
            data:[],
            name:''
        }
    }
    componentDidMount(){
        this.getCategoryProduct()
    }
    componentDidUpdate(prevProps, prevState){
        const {match} = this.props
        const nextId = _.get(match, 'params.categoryId')

        if(nextId !== prevProps.match.params.categoryId){
            this.getCategoryProduct(nextId)
        }
    }
    async getCategoryProduct(newId){
        const {match} = this.props
        const categoryId = _.get(match,'params.categoryId')
        const categoryName = _.get(match,'params.categoryName')
        try{
            const productList = await API.getProductByName({categoryId:(newId || categoryId)})
            this.setState({
                data:_.get(productList,'data.data',[]),
                name:categoryName
            })
        }catch(err){
            console.log(err.message)
        }
    }
    render(){
        const {data,name} = this.state
        return(
            <>
                <div class="products">
                    <h3>{name} (hiện có {data.length} sản phẩm)</h3>
                    <div class="product-list card-deck">
                        {data.map((e) => <Items productDetails={e}/>)}
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
export default Category