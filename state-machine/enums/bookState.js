const graphql = require('graphql')

const { GraphQLEnumType } = graphql

const BookState = new GraphQLEnumType({
    name: 'BookState',
    values: {
      ACTIVE: {
        value: 'ACTIVE'
      },
      INACTIVE: {
        value: 'INACTIVE'
      }
    }
  })

module.exports = { BookState }