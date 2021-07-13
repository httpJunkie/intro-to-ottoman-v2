const { Ottoman } = require('ottoman')
const ottoman = new Ottoman({collectionName: '_default'});
ottoman.connect({
    connectionString: 'couchbase://localhost',
    bucketName: 'travel',
    username: 'Administrator',
    password: 'password'
});

const { Airline } = require('./airline-schema-and-model')

// Remove the Couchbase Airline document by ID from Couchbase Server
const removeDocument = async() => {
  try {
    await Airline.removeById('Airline::ec21bc12-4ee8-40c7-96dc-b5421e9873e1')
      .then((result) => console.log(result))
  } catch (error) {
    throw error
  }
}

ottoman.start()
  .then(async() => {
    removeDocument()
      .then(() => process.exit(0))
      .catch((error) => console.log(error))
  })