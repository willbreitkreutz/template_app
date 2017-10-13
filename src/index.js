// import libs
import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';

// import helpers
import app from 'ampersand-app';
import itemStore from './stores/itemStore';

// import components
import Header from './containers/header/Header';
import Home from './containers/temp/Home';
import Page2 from './containers/temp/Page2';

// import css styles
import './css/reset.css';
import './css/bootstrap/css/bootstrap-simplex.css';
import './index.css';


const App = () => {
  return (
    <Router hashType="noslash">
      <div>
        <PageHeader>
          <Header />
        </PageHeader>

        <Route exact path="/" component={Home} />

        <Route path="/page2/:variable" component={Page2} />

      </div>
    </Router>
  )
}

// simple global event bus that we can listen to
const actions = Reflux.createActions([
  'loadItems'
]);

// sometimes this makes debugging easier, comment out for production
window.app = app;

app.extend({
  actions: actions,
  router: Router,
  init(){
    ReactDOM.render(<App/>, document.getElementById('root'))
  }
})

// set up stores
app.itemStore = new itemStore();

// then start it all up
app.init();
