import React, { Component } from 'react';
import Header from './components/Layout/Header'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'

import './App.css';

class App extends Component {

  state = {
    todos: [
      {
        id:1,
        title: 'take out the trash',
        completed: false
      },
      {
        id:2,
        title: 'dinner with wife',
        completed: false
      },
      {
        id:3,
        title: 'meeting with boss',
        completed: false
      },
    ]  
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

    this.setState({ todos: [...this.state.todos.filter(todo => 
      todo.id !==id)] });
  }

  render() {
    //console.log(this.state.todos);
    return (
    <div className="App">
      <Header />
      <AddTodo />
      <Todos todos={this.state.todos} markComplete= {this.markComplete} delTodo={this.delTodo}  />
    </div>
    );
  }
}

export default App;
