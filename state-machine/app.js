const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const simfinity = require('@simtlix/simfinity-js')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_HOST)
/* 
    if you´re using run-rs package you may need parameters
    e.g : mongoose.connect(process.env.DB_HOST,{ replicaSet: 'rs', useNewUrlParser: true, useUnifiedTopology: true })
*/ 

mongoose.connection.once('open', () => {
  console.log('connected to database')
})

/* This route will be used as an endpoint to interact with Graphql,
All queries will go through this route. */
const book = require('./types/book')
const schema = simfinity.createSchema([book])

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


app.listen(3000, () => {
  console.log('Listening on port 3000')
})