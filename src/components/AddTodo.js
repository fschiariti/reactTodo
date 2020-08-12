import React, { Component } from 'react'

export class AddTodo extends Component {
    render() {
        return (
            <form>
                <input type="text" 
                name="title" 
                placeholder="Add todo..."
                />
                <input type="submit" 
                value="Submit" 
                />

            </form>
        )
    }
}

export default AddTodo