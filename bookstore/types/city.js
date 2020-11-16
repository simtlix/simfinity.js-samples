const graphql = require('graphql')
const Author = require('../models/author')
const City = require('../models/city')

const simfinity = require('@simtlix/simfinity-js')

const {
  GraphQLObjectType, GraphQLString, GraphQLID,
  GraphQLInt, GraphQLList
} = graphql

const CityType = new GraphQLObjectType({
  name: 'CityType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    population: { type: GraphQLInt },
    authors: {
      type: new GraphQLList(AuthorType),
      extensions: {
        relation: {
          connectionField: 'cityID'
        }
      },
      resolve (parent, args) {
        return Author.find({ cityID: parent.id })
      }
    }
  })
})

simfinity.connect(City, CityType, 'city', 'cities')

module.exports = CityType

const AuthorType = require('./author')
