import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Layout/Header'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import About from './components/pages/About'
//import { v4 as uuidv4 } from 'uuid';
import './App.css'
import axios from 'axios'


class App extends Component {

  state = {
    /*
    todos: [
      {
        id:uuidv4(),
        title: 'take out the trash',
        completed: false
      },
      {
        id:uuidv4(),
        title: 'dinner with wife',
        completed: false
      },
      {
        id:uuidv4(),
        title: 'meeting with boss',
        completed: false
      },
    ]  
    */
    todos: []  
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(res => this.setState({ todos: res.data}))
  }

//Toogle complete
  markComplete = (id) => {
    console.log(id);    


    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id ===id) {
        todo.completed = !todo.completed;
      }

      return todo;
    })
  });
  }


//Delete todo

  delTodo = (id) => {
    console.log(id);    

    axios.delete('https://jsonplaceholder.typicode.com/todos/${id}')
    .then(res => this.setState({ todos: [...this.state.todos.filter(todo => 
      todo.id !==id)] }))

  }

  //Add todo

  addTodo = (title) => {
    console.log(title);

    let newTodo = {
      title: title,
      completed: false
    }

    axios.post('https://jsonplaceholder.typicode.com/todos', newTodo )
    .then(res => this.setState( {todos: 
      [...this.state.todos, res.data] } ));
    
  }


  render() {
    //console.log(this.state.todos);
    return (
    <Router >
      <div className="App">
        <div className="container">
          <Header />
          <Route exact path="/" render={props => (
            <React.Fragment>
              <AddTodo addTodo={this.addTodo} />
              <Todos todos={this.state.todos} markComplete= 
              {this.markComplete} delTodo={this.delTodo}  />
            </React.Fragment>
          )} />
          <Route path="/about" component={About} />
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
