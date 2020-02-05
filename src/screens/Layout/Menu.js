import React, { Component } from 'react';

class Menu extends Component {
  render() {
    return (
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <nav>
            <div id="menu" class="collapse navbar-collapse">
              <ul>
                <li class="menu-item"><a href="#">iPhone</a></li>
                <li class="menu-item"><a href="#">Samsung</a></li>
                <li class="menu-item"><a href="#">HTC</a></li>
                <li class="menu-item"><a href="#">Nokia</a></li>
                <li class="menu-item"><a href="#">Sony</a></li>
                <li class="menu-item"><a href="#">Blackberry</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Menu;
