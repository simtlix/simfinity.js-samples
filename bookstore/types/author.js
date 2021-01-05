const graphql = require('graphql')
const Author = require('../models/author')
const City = require('../models/city')
const simfinity = require('@simtlix/simfinity-js')

const {
  GraphQLObjectType, GraphQLString, GraphQLID,
  GraphQLInt, GraphQLList
} = graphql

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  embedded: true,
  fields: () => ({
    id: { type: GraphQLID },
    name: {
      type: GraphQLString,
      description: 'Name of the author'
    },
    age: { type: GraphQLInt },
    city: {
      type: CityType,
      extensions: {
        relation: {
          connectionField: 'cityID'
        }
      },
      resolve (parent, args) {
        return City.findById(parent.cityID)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      extensions: {
        relation: {
          connectionField: 'authorID'
        }
      },
      resolve (parent, args) {
        return simfinity.getModel(BookType).find({ authorID: parent._id })
      }
    }
  })
})

simfinity.connect(Author, AuthorType, 'author', 'authors')

module.exports = AuthorType

const BookType = require('./book')
const CityType = require('./city')
