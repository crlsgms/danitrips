// vai representar o modelo de dados das viagens no MongoDB
// 1 viagem é feita por 1 cliente
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Cliente = require('./cliente.model')

let viagemSchema = new Schema({
  cidade: { type: String, required: true },
  data: { type: Date, required: true },
  preco: { type: Number, required: true },
  cliente: { type: Schema.Types.ObjectId, ref: 'cliente' }
})

// vamos exportar o esquema para a utilização em outro arquivo
module.exports = mongoose.model('viagem', viagemSchema)