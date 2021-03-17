const { Ottoman } = require('ottoman')
const ottoman = new Ottoman({collectionName: '_default'});
ottoman.connect({
    connectionString: 'couchbase://localhost',
    bucketName: 'travel',
    username: 'Administrator',
    password: 'password'
});

const { Airline } = require('./airline-schema-and-model')

// Update the Couchbase Airline document by Callsign from Couchbase Server
const findDocumentAndUpdate = async() => {
  const newDocument = {
    callsign: 'CBSA',
    country: 'United States',
    name: 'Couchbase Airways',
    phone: ['321-321-3210','321-123-1234']
  }
  try {
    let result = await Airline.findOneAndUpdate(
      { callsign: { $like: 'CBA' } }, newDocument, { new: true }
    )
    console.log(result)
  } catch (error) {
    throw error
  }
}

ottoman.start()
  .then(async() => {
    findDocumentAndUpdate()
      .then(() => process.exit(0))
      .catch((error) => console.log(error))
  })