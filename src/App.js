import React, { Component } from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom'

import Todos from './Components/Todos'
import AddTodo from './Components/AddTodo'
import Header from './Components/layout/Header'
import About from './Components/pages/About'

import { v4 as uuidv4 } from 'uuid';
import Axios from 'axios'

import './App.css';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    Axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }

  // toogle complete
  markComplete = (id) => {
    this.setState({ todos : this.state.todos.map(todo => {
      if(todo.id == id){
        todo.completed = !todo.completed
      }
      return todo
    }) })
  }

  // delete todo
  delTodo = (id) => {
    //for http request
    // Axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
    //   .then(res => this.setState({
    //     todos : [...this.state.todos.filter(todo => todo.id !== id )]
    //   }))

      //for local storage
      this.setState({
        todos : [...this.state.todos.filter(todo => todo.id !== id )] })
  }

  //add todo
  addTodo = (title) => {
    //for local storage
    const newTodo = {
      id: uuidv4(),
      title: title,
      complete: false
    }

    this.setState({
      todos : [...this.state.todos, newTodo]
    })

    //for http request
    // Axios.post('http://jsonplaceholder.typicode.com/todos', {
    //   title,
    //   completed: false
    // }).then( res => this.setState({
    //   todos : [...this.state.todos, res.data]
    // }) )
  }
  
  render (){
    return(
      <Router>
        <div className="App">
          <div className="container" >
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} 
                markComplete={this.markComplete}
                delTodo={this.delTodo} />
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
