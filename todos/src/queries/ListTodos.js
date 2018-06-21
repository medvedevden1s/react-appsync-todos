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

// query listTodos {
//   listTodos(first:2){
//     items{
//       id
//       name
//     }
//   }
// }