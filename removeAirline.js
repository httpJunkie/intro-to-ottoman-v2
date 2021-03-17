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
    await Airline.removeById('60e3f517-6a2a-41fe-be45-97081181d675')
      .then((result) => console.log(result))
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