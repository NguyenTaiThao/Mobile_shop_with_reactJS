import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Layout/Header'
import Footer from './Layout/Footer'
import Menu from './Layout/Menu'
import Slide from './Layout/Slide'
import SideBanner from './Layout/SideBanner'
import Home from './Layout/Home'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <div id="body">
          <div class="container">
            <Menu />
            <div class="row">
              <div id="main" class="col-lg-8 col-md-12 col-sm-12">
                <Slide />
                <Switch>
                  <Route path='/' component={Home} />
                </Switch>
              </div>
              <SideBanner />
            </div>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    )
  }
}

export default App