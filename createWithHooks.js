const { Ottoman } = require('ottoman')
const ottoman = new Ottoman({collectionName: '_default'});
ottoman.connect({
    connectionString: 'couchbase://localhost',
    bucketName: 'travel',
    username: 'Administrator',
    password: 'password'
});

const { Airline, airlineSchema } = require('./airline-schema-and-model')

// Plugins and Hooks are middleware, think lifecycle hooks!
const pluginLog = (airlineSchema) => {
  airlineSchema.pre('save', (doc) => 
    console.log(`Doc: ${doc.name} about to be saved`)
  )
  airlineSchema.post('save', (doc) => 
    console.log(`Doc: ${doc.id} has been saved`)
  )
};

// Our plugin must be registered before the model creation
airlineSchema.plugin(pluginLog)

// Constructing our document
const cbAirlines = new Airline({
  callsign: 'UNITED',
  country: 'United States',
  name: 'United Airlines',
  phone: ['321-321-3210', '321-123-1234']
})

const saveDocument = async() => {
  try {
    // pre and post hooks will run
    const result = await cbAirlines.save()
    console.log(result)
  } catch (error) {
    throw error
  }
}

ottoman.start()
  .then(async() => {
    saveDocument()
      .then(() => process.exit(0))
      .catch((error) => console.log(error))
  })