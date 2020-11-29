// importa o esquema do Cliente
const Cliente = require("../models/cliente.model")

let clienteController = {
    insere: async (req, res) => {
        let cliente = Cliente({
            nome: req.body.nome,
            cpf: req.body.cpf,
            rg: req.body.rg,
            enderecos: req.body.enderecos,
            telefones: req.body.telefones,
            viagens: req.body.viagens,
        })
        //salva no mongo
        cliente.save()
        // devolve o resultado
        res.json(cliente)
    },
    consulta: async (req, res) => {
        if (req.params.id == undefined) {
            Cliente.find()
                .populate('viagens') // busca todas as viagens do cliente
                .exec()
                .then(clientes => {
                    res.json(clientes)
                    console.log('busquei todos')
                })
        } else {
            Cliente.findOne({ _id: req.params.id }) // busca a viagem com id no GET
                .populate('viagens')
                .exec()
                .then(clientes => {
                    res.json(clientes)
                    console.log('busquei um')
                })
        }

    },
    remove: async (req, res) => {
        Cliente.deleteOne({ _id: req.params.id })
            .then(resultado => {
                console.log('Cliente Removido com Sucesso!')
                res.json(resultado)
            })
    },
    atualiza: async (req, res) => {
        Cliente.updateOne({ _id: req.params.id }, {
            nome: req.body.nome,
            rg: req.body.rg,
            rua: req.body.rua,
            numero: req.body.numero,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            viagens: req.body.viagens
        })
            .then(resultado => {
                console.log('Cliente Atualizado com Sucesso!')
                res.json(resultado)
            })
    }

}

module.exports = clienteController