const graphql = require('graphql')
const simfinity = require('@simtlix/simfinity-js')
const Category = require('../models/category')

const {
  GraphQLObjectType, GraphQLString, GraphQLID
} = graphql

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
})

simfinity.connect(Category, CategoryType, 'category', 'categories')

module.exports = CategoryType
