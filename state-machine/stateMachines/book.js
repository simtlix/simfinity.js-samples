const {BookState} = require('../enums/bookState')

const stateMachine = {
  initialState: BookState._nameLookup.INACTIVE,
  actions: {
    inactivate: {
      from: BookState._nameLookup.ACTIVE,
      to: BookState._nameLookup.INACTIVE,
      description: 'Inactivate book sent by parameter',
      action: async (params) => {
        console.log(JSON.stringify(params))
      }
    },
    activate: {
      from: BookState._nameLookup.INACTIVE,
      to: BookState._nameLookup.ACTIVE,
      action: async (params) => {
        console.log(JSON.stringify(params))
      }
    }
  }
}

module.exports = {stateMachine}