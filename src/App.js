import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Layout/Header'
import Todo from './components/Todo'
import About from './components/pages/About'
import './App.css'


/*
<Route exact path="/" render={props => (
  <React.Fragment>
    <Todo/>
  </React.Fragment>            
)} />
*/

class App extends Component {

  render() {
    return (
    <Router >
      <div className="App">
        <div className="container">
          <Header />
          <Route exact path="/" component={Todo} />
          <Route path="/about" component={About} />
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
