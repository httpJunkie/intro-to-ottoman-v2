const { Ottoman } = require('ottoman')
const ottoman = new Ottoman({collectionName: '_default'});
ottoman.connect({
    connectionString: 'couchbase://localhost',
    bucketName: 'travel',
    username: 'Administrator',
    password: 'password'
});

const { Airline } = require('./airline-schema-and-model')

// Constructing our document
const cbAirlines = new Airline({
  callsign: 'CBA',
  country: 'United States',
  name: 'Couchbase Airlines',
  phone: ['321-321-3210', '321-123-1234']
})

// Persist the Couchbase Airlines document to Couchbase Server
const saveDocument = async() => {
  try {
    const result = await cbAirlines.save()
    console.log(result)
  } catch (error) {
    throw error
  }
}

// Ensure that all indexes exist on the server
ottoman.start()
  // Next, let's save our document and print a success message 
  .then(async() => {
    saveDocument()
      .then(() => process.exit(0))
      .catch((error) => console.log(error))
  })