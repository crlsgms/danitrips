// vai representar o modelo de dados do cliente no MongoDB
// 1 cliente pode fazer N viagens
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Viagem = require('./viagem.model')

let clienteSchema = new Schema({
  nome: { type: String, required: true },
  cpf: { type: Number, required: true, index: { unique: true } },
  rg: { type: String },
  enderecos: {
    type: Array,
    itens: {
      logradouro: String,
      numero: Number,
      bairro: String,
      complemento: String,
      cep: String,
      cidade: String,
      estado: String
    }
  },
  telefones: {
    type: Array,
    itens: {
      numero: String,
      tipo: String
    }
  },
  viagens: [{// vetor com N viagens do cliente
    type: Schema.Types.ObjectId,
    ref: 'Viagem'
  }]
})

// vamos exportar o esquema para a utilização em outro arquivo
module.exports = mongoose.model('Cliente', clienteSchema)