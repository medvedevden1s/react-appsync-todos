import graphql from 'graphql-tag'

export default graphql `
query listTodos {
  listTodos {
      items {
      id
      name
      completed
    }
  } 
} 
`