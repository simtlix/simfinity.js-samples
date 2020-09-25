
# How to


## Install

2. use `npm install`

1. create .env file and add your mongo uri string , e.g : `DB_HOST = mongodb://localhost:27017/example`

3. run `npm run start` 

## Use

TODO: insert diagram

Instance your states
```javascript
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
```

Set your state machine behavior
```javascript
  const stateMachine = {
    initialState: BookState._nameLookup.INACTIVE,
    actions: {
      active_to_inactive: {
        from: BookState._nameLookup.ACTIVE,
        to: BookState._nameLookup.INACTIVE,
        description: 'Inactivate book sent by parameter',
        action: async (params) => {
          console.log(JSON.stringify(params))
        }
      },
      inactive_to_active: {
        from: BookState._nameLookup.INACTIVE,
        to: BookState._nameLookup.ACTIVE,
        action: async (params) => {
          console.log(JSON.stringify(params))
        }
      }
    }
  }
```

You can use BookState on your state field
```javascript
  const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      state: { type: BookState },
    })
  })
```

Register your state machine using connect function
````javascript
  simfinity.connect(null, BookType, 'book', 'books', null, null, stateMachine)
```


## queries

Create a document
```graphql
mutation{
  addbook(
    input:{
      name: "Bar"
  }) {
    # fields you want to recover
    id
    name
    state
  }
}
```

Simfinity have been automatically create states queries

```graphql
mutation{
  inactive_to_active_book(input:{
  	id:"5f6be280baf80d2af0ebe792" # use your mongo id instead
  }){
    name
    state
  }
}```

```graphql
mutation{
  activate_to_inactive(input:{
  	id:"5f6be280baf80d2af0ebe792" # use your mongo id instead
  }){
    name
    state
  }
}```

