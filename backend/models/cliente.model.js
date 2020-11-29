// vai representar o modelo de dados do cliente no MongoDB
// 1 cliente pode fazer N viagens
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Viagem = require('./viagem.model')

let clienteSchema = new Schema({
  nome: {type: String , required: true},
  rg: {type: String , required: true},
  rua: {type: String , required: true},
  numero: {type: String , required: true},
  bairro: {type: String , required: true},
  cidade: {type: String , required: true},
  estado: {type: String , required: true},
  viagens: [{
      type: Schema.Types.ObjectId,
      ref: 'viagem'
  }]
})

module.exports = mongoose.model('cliente',clienteSchema)