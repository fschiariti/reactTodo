import React, { Component } from 'react'



export class SearchTodo extends Component {

    state = {
        buscar: '' 
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onKeyUp = (e) => {
        this.props.searchTodo(this.state.buscar)
    }

    render() {
        return (
            <form style={{ display: 'flex'}}>
                <input type="text" 
                name="buscar" 
                style = {{flex: '10', padding: '5px'}}
                placeholder="Search todo..."  autoComplete="off"
                value={this.state.buscar}
                onChange={this.onChange}
                onKeyUp={this.onKeyUp}
                />
            </form>
        )
    }
}

export default SearchTodo