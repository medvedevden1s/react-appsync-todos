import graphql from 'graphql-tag'

export default graphql `
 mutation createTodo(
  $id: ID!
  $name: String!
  $completed: Boolean!
 ) {
   createTodo(input: {
    id: $id, name: $name, completed: $completed
   }) {
     id
     name
     completed
   }
 }
`

// mutation createTodo {
//   createTodo(input: {
//     id: "3"
//     name: "get butter"
//     completed: false
//   }){
//     id
//   }
// }