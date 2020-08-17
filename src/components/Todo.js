import React, { Component } from 'react';
import Todos from './Todos'
import SearchTodo from './SearchTodo'
import AddTodo from './AddTodo'
import axios from 'axios'

class Todo extends Component {

  state = {
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
    
    const r = window.confirm("Do you really want to delete?"); 
    
    if(r)
    {  
      console.log(id);    

      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => 
        todo.id !==id)] }))
    }
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


  cancelAddTodo = () => {
    this.setState({ id: "", title : "" })   
  }


  render() {
    return (
      <div>
        <SearchTodo searchTodo={this.searchTodo} />
        <AddTodo addTodo={this.addTodo} id={this.state.id} cancelAddTodo={this.cancelAddTodo} title={this.state.title} />
        <Todos todos={this.state.todos} markComplete= 
        {this.markComplete} delTodo={this.delTodo} editTodo={this.editTodo}  />
      </div>
    );
  }
}


export default Todo;
