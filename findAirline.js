const { Ottoman } = require('ottoman')
const ottoman = new Ottoman({collectionName: '_default'});
ottoman.connect({
    connectionString: 'couchbase://localhost',
    bucketName: 'travel',
    username: 'Administrator',
    password: 'password'
});

const { Airline } = require('./airline-schema-and-model')

// Find the Couchbase Airline document by Callsign from Couchbase Server
const findDocument = async() => {
  try {
    const result = await Airline.find({ callsign: { $like: 'CBA' } })
    console.log(result.rows)
  } catch (error) {
    throw error
  }
}

ottoman.start()
  .then(async() => {
    findDocument()
      .then(() => process.exit(0))
      .catch((error) => console.log(error))
  })
  .catch((error) => console.log(error))