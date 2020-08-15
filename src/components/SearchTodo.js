import React, { Component } from 'react'



export class SearchTodo extends Component {

    state = {
        buscar: '' 
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        this.props.searchTodo(this.state.buscar);
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.searchTodo(this.state.buscar);
//        this.setState({ title: ''});
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{ display: 'flex'}}>
                <input type="text" 
                name="buscar" 
                style = {{flex: '10', padding: '5px'}}
                placeholder="Search todo..."  autoComplete="off"
                value={this.state.buscar}
                onChange={this.onChange}
                />
            </form>
        )
    }
}

export default SearchTodo