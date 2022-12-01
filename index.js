const { Engine } = require('json-rules-engine')


/**
 * Setup a new engine
 */
let engine = new Engine()

// define a rule for detecting the player has exceeded foul limits.  Foul out any player who:
// (has committed 5 fouls AND game is 40 minutes) OR (has committed 6 fouls AND game is 48 minutes)
let array = ['1','2']
engine.addRule({
  conditions: {
    any: [{
      all: [{
        fact: 'temperature',
        operator: 'equal',
        value: '20'
      }, {
        fact: 'idDevice',
        operator: 'in',
        value:array
      }
      ]
    }]
  },
  onSuccess(){
    console.log('La regla funcionó')
  },
  event: {  // define the event to fire when the conditions evaluate truthy
    type: 'message',
    params: {
      status: 'on'
    }
  }
})

/**
 * Define facts the engine will use to evaluate the conditions above.
 * Facts may also be loaded asynchronously at runtime; see the advanced example below
 */
let facts = {
  temperature:'20',
  idDevice: '3'
}

console.log(array)
// Run the engine to evaluate
engine.run(facts)

array.push('3')
console.log(array)
let facts2 = {
  temperature:'20',
  idDevice: '3'
}
//engine.run(facts2)
  /*.then(({ events }) => {
    events.map(event => console.log(event.params.status))
  })*/

/*
 * Output:
 *
 * Player has fouled out!
 */