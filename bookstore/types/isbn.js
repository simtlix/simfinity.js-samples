const graphql = require('graphql')
const simfinity = require('@simtlix/simfinity-js')
const ISBNCodeType = require('./isbnCode')
const {
  GraphQLObjectType, GraphQLString
} = graphql

const ISBNType = new GraphQLObjectType({
  name: 'ISBN',
  fields: () => ({
    country: { type: GraphQLString },
    number: { type: GraphQLString },
    code: {
      type: ISBNCodeType,
      extensions: {
        relation: {
          embedded: true
        }
      },
      resolve (parent) {
        return parent.code
      }
    }
  })
})

simfinity.addNoEndpointType(ISBNType)

module.exports = ISBNType
