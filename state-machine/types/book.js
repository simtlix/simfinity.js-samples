const graphql = require('graphql')
const simfinity = require('@simtlix/simfinity-js')
const {BookState} = require('../enums/bookState')
const {stateMachine} = require('../stateMachines/book')

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    state: { type: BookState },
  })
})

module.exports = BookType


simfinity.connect(null, BookType, 'book', 'books', null, null, stateMachine)