import React, { Component } from 'react';
import * as API from '../../services/api'
import {Link} from 'react-router-dom'
class Menu extends Component {
  constructor(props){
    super(props)
    this.state = {
      categories:[]
    }
  }
  componentDidMount(){
    this.getCategories()
  }
  async getCategories(){
    try{
      const categories = await API.getCategories();
      this.setState({
        categories:categories.data.data
      })
    }catch(error){
      console.log(error.message)
    }
  }
  render() {
    const {categories} = this.state
    return (
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <nav>
            <div id="menu" class="collapse navbar-collapse">
              <ul>
                {categories && categories.map((e) => (
                    <li class="menu-item"><Link to={`/category/${e._id}/${e.name}`}>{e.name}</Link></li>
                  )
                )} 
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Menu;
