/* Demonstrate Query Builder using Access Functions */
const { Ottoman, Query } = require('ottoman')
const ottoman = new Ottoman({collectionName: '_default'});

ottoman.connect({
    connectionString: 'couchbase://localhost',
    bucketName: 'travel',
    username: 'Administrator',
    password: 'password'
});

/* Replace with QueryBuilder Example */

/* PARAMETERS */
// const generateQuery = async() => {
//   try {
//     const params = {
//       select : [
//         { $field: 'name' }, 
//         { $field: 'country'}
//       ],
//       where: { $and: [
//         { country: {$eq: 'United States'}},
//         { _type: {$eq: 'Airline'}}
//       ] },
//       limit: 10
//     }
//     const query = new Query(params, '`travel`').build()
//     console.log('Query Generated: ', query)
//     return query
//   } catch (error) {
//     throw error
//   }
// }

/* ACEESS FUNCTIONS */
// const generateQuery = async() => {
//   try {
//     const query = new Query({}, '`travel`')
//       .select([
//         { $field: 'name' }, 
//         { $field: 'country'}
//       ])
//       .where({ $and: [
//         { country: {$eq: 'United States'}},
//         { _type: {$eq: 'Airline'}}
//       ]})
//       .limit(10)
//       .build()
//       console.log('Query Generated: ', query)
//       return query
//   } catch (error) {
//     throw error
//   }
// }

/* MIXED MODE */
const generateQuery = async() => {
  try {
    const where =  { $and: [
      { country: {$eq: 'United States'}},
      { _type: {$eq: 'Airline'}}
    ] }
    // pass in our query as a condition expression
    const query = new Query({ where }, '`travel`')
      .select([
        { $field: 'name' }, 
        { $field: 'country' }
      ])
      .limit(10)
      .build()
      console.log('Query Generated: ', query)
      return query
  } catch (error) {
    throw error
  }
}

const executeQuery = async(query) => {
  try {
    const result = await ottoman.query(query)
    console.log('Query Result: ' , result)
  } catch (error) {
    throw error
  }
}

generateQuery()
  .then((result) => {
    executeQuery(result)
      .then(() => process.exit(0))
  })
  .catch((error) => console.log(error))
