const graphql = require('graphql')
const simfinity = require('@simtlix/simfinity-js')

const {
  GraphQLObjectType, GraphQLString
} = graphql

const ISBNCodeType = new GraphQLObjectType({
  name: 'ISBNCode',
  fields: () => ({
    codeType: { type: GraphQLString },
    number: { type: GraphQLString }
  })
})

simfinity.addNoEndpointType(ISBNCodeType)

module.exports = ISBNCodeType
