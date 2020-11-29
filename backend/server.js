// importa o express
let express = require('express')
// cria o servidor
let servidor = express()

//importa o body-parser
let bodyParser = require('body-parser')
// configura o servidor para usar o bodyParser
// coreções de extend para extended, typo na aula ai plotava erro no console
//servidor.use(bodyParser.urlencoded({extend: false}))
servidor.use(bodyParser.urlencoded({ extended: false }))
servidor.use(bodyParser.json())

//importa o Mongoose
let mongoose = require('mongoose')
// conecta no mongodb local
// adicionei o createindex por conta do erro de deprecação no console
mongoose.connect('mongodb://localhost/danitrips', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// importa os controllers
let clienteController = require('./controllers/cliente.controller')
let viagemController = require('./controllers/viagem.controller')

// cria as rotas para o cliente
servidor.get('/cliente/:id?', clienteController.consulta)
servidor.post('/cliente', clienteController.insere)
servidor.delete('/cliente/:id', clienteController.remove)
servidor.put('/cliente/:id', clienteController.atualiza)

// cria as rotas para a viagem
servidor.get('/viagem/:id?', viagemController.consulta)
servidor.post('/viagem', viagemController.insere)
servidor.delete('/viagem/:id', viagemController.remove)
servidor.put('/viagem/:id', viagemController.atualiza)

// sobe o servidor
servidor.listen(3003, () => {
    console.log('Backend Server de pé -> http://lhost:3003')
})