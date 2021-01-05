const express = require('express')
const graphqlHTTP = require('express-graphql')
const simfinity = require('@simtlix/simfinity-js')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017,localhost:27018,localhost:27019/example', { replicaSet: 'rs', useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.once('open', () => {
  console.log('connected to database')
})

mongoose.set('debug', true);

const type = require('./types')
const includedTypes = [type.Book]

/* This route will be used as an endpoint to interact with Graphql,
All queries will go through this route. */
const schema2 = simfinity.createSchema(includedTypes, includedTypes)
const schema = simfinity.createSchema()

app.use('/graphql', graphqlHTTP({
  // Directing express-graphql to use this schema to map out the graph
  schema,
  /* Directing express-graphql to use graphiql when goto '/graphql' address in the browser
  which provides an interface to make GraphQl queries */
  graphiql: true,
  formatError: simfinity.buildErrorFormatter((err) => {
    console.log(err)
  })

}))
app.use('/graphql2', graphqlHTTP({
  // Directing express-graphql to use this schema to map out the graph
  schema: schema2,
  /* Directing express-graphql to use graphiql when goto '/graphql' address in the browser
  which provides an interface to make GraphQl queries */
  graphiql: true,
  formatError: simfinity.buildErrorFormatter((err) => {
    console.log(err)
    return err
  })

}))


app.listen(3000, () => {
  console.log('Listening on port 3000')
})
