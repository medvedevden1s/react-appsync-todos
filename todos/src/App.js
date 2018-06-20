import React, { Component } from 'react';
import './App.css';

import { compose, graphql } from 'react-apollo'
import ListTodos from './queries/ListTodos'
import CreateTodo from './mutations/CreateTodo'
import uuidV4 from 'uuid/v4'

class App extends Component {
  state = {
    id: '',
    name: '',
    completed: false,
    todoList: []
  }

  onChange = (key, value) => {
    this.setState({ [key]: value })
  }

  addTodo = () => {
    const { name, completed } = this.state
    this.props.onAdd({
      id: uuidV4(),
      name,
      completed
    })

    this.setState({
        id: '',
        name: '',
        completed: false
    })
  }

  render() {
    return (
      <div className="App" style={styles.container}>
        {
          this.props.todos.map((todo, index) => (
            <div key={index}>
              <p>{todo.name}</p>
            </div> 
          ))
        }
        <input 
          value={this.state.name}
          placeholder='Todo Name'
          style={styles.input}
          onChange={event => this.onChange('name', event.target.value)}
        />

        <button onClick={this.addTodo} style={styles.button}>Add Todo</button>
      </div>
    );
  }
}

const styles = {
  container: {
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center'
  },
  input: {
    border: 'none',
    fontSize: 22,
    heigh:50,
    width: 450,
    borderBottom: '2px solid blue',
    margin: 10
  },
  button: {
   heigh:50,
   width: 450,
   margin: 10
  }
 }



 export default compose(
  graphql(ListTodos, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      todos: props.data.listTodos ? props.data.listTodos.items : []
    })
  }),
  graphql(CreateTodo, {
    props: props => ({   
      onAdd: todo => props.mutate({
          variables: todo,
          optimisticResponse: {
            __typename: 'Mutation',
            createTodo: { ...todo, __typename: 'Todo' }
          },
          update: (proxy, {data: { createTodo } }) => {
            const data = proxy.readQuery({ query: ListTodos })
            let hasBeenAdded = false
            data.listTodos.items.map((item) => {
              if (item.id === createTodo.id) {
                hasBeenAdded = true
              }
            })
            if (hasBeenAdded) return
            data.listTodos.items.push(createTodo)
            proxy.writeQuery({ query: ListTodos, data })
          }
        })
    })
  })
)(App);