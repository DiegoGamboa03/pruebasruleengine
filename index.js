const { Engine } = require('json-rules-engine')


const engine = new Engine()

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
    onFailure(){
      console.log('La regla no funcionó')
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


async function ejecutar () {
  let facts = {
    temperature:'20',
    idDevice: '3'
  }
  await engine.run(facts)
  array.push('3')
  await engine.run(facts)
    
}

async function runEngine (facts) {
  engine.run(facts)
}

ejecutar();

