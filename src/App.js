import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Layout/Header'
import Todos from './components/Todos'
import SearchTodo from './components/SearchTodo'
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
    todos: [],
    title: "",
    id: ""
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

    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos: [...this.state.todos.filter(todo => 
      todo.id !==id)] }))

  }

  //Add todo

  addTodo = (t) => {
    console.log(t.title);

    let newTodo = {
      title: t.title,
      id: t.id,
      completed: false
    }

    if (t.id === "") {
      axios.post('https://jsonplaceholder.typicode.com/todos', newTodo )
      .then(res => this.setState( {id: "", title: '', todos: 
        [...this.state.todos, res.data] } ));  
    } else {
      axios.put(`https://jsonplaceholder.typicode.com/todos/${t.id}`, newTodo )
      .then(res => this.setState( {id: "", title: '', todos: 
          this.state.todos.map(todo => {
            if (todo.id ===t.id) {
              todo.title = t.title;
            }
      
            return todo;
          })
     } ));  
    }
    
  }

  //Search todo

  searchTodo = (s) => {
    console.log(s);

    let searchTodo = {
      title: s,
      completed: false
    }

    if (searchTodo.title) {
      this.setState({ todos: this.state.todos.filter(t=> t.title.indexOf(searchTodo.title) > -1)
      });

    } else {
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(res => this.setState({ todos: res.data}))  
    }

    

  }

  editTodo = (id, title) => {
    console.log(id) 
    this.setState({ id: id, title : title })   
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
              <SearchTodo searchTodo={this.searchTodo} />
              <AddTodo addTodo={this.addTodo} id={this.state.id}  title={this.state.title} />
              <Todos todos={this.state.todos} markComplete= 
              {this.markComplete} delTodo={this.delTodo} editTodo={this.editTodo} />
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
