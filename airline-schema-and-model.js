const { model, Schema } = require('ottoman')

const regx = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/
const airlineSchema = new Schema({ 
  callsign: String, 
  country: String, 
  name: String,
  phone: [{type: String, validator: {regexp: regx, message: 'phone invalid'}}]
})

// Compile our model using our schema
const Airline = model('Airline', airlineSchema)

exports.airlineSchema = airlineSchema;
exports.Airline = Airline;