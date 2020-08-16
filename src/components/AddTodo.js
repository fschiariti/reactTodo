import React, { Component } from 'react'



export class AddTodo extends Component {


    state = {
        title: '', 
        id: ''
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state);
        this.setState({ title: ''});
    }

    componentWillReceiveProps(props) {
        this.setState({
            title: props.title, id: props.id
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{ display: 'flex'}}>
                <input type="text" 
                name="title" 
                style = {{flex: '10', padding: '5px'}}
                placeholder={this.props.title ? "Edit todo..." : "Add todo..."} 
                autoComplete="off"
                value={this.state.title}
                onChange={this.onChange}
                />
                <input type="submit" 
                value= {this.props.title ? "Update" : "Add"} 
                className="btn" 
                style={{flex: '1' }}
                />
            </form>
        )
    }
}

export default AddTodo