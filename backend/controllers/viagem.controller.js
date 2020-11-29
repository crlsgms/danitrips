const Viagem = require("../models/viagem.model")

let viagemController = {
    //metodo para inserção assíncrono - metodo pode continuar sem que o servidor já tenha respondido
    insere: async (req, res) => {
        let viagem = Viagem({
            cidade: req.body.cidade,
            data: req.body.data,
            preco: req.body.preco,
            cliente: req.body.cliente
        })
        // salva no mongo
        viagem.save()
        // devolve o resultado gravado
        res.json(viagem)
    },
    consulta: async (req, res) => {
        if (req.params.id == undefined) {
            Viagem.find()
                .populate('Cliente')
                .exec()
                .then(viagens => {
                    res.json(viagens) // retorna todas as viagens
                })
        } else {
            Viagem.findOne({ _id: req.params.id }) //retorna o id procurado, se presente no GET
                .populate('Cliente')
                .exec()
                .then(viagem => {
                    res.json(viagem)
                })
        }

    },
    remove: async (req, res) => {
        Viagem.deleteOne({ _id: req.params.id })
            .then(resultado => {
                console.log('Viagem Removida com Sucesso!')
                res.json(resultado)
            })
    },
    atualiza: async (req, res) => {
        // try {
        //     const trip = { ...this.state.trip }
        //     trip[e.target.name] = e.target.value
        //     this.setState({ trip })
        // } catch (error) {
        //     console.log(this.state)
        // }
        Viagem.updateOne({ _id: req.params.id }, {
            cidade: req.body.cidade,
            data: req.body.data,
            preco: req.body.preco,
            cliente: req.body.cliente
        })
            .then(resultado => {
                console.log('Viagem Atualizada com Sucesso!')
                res.json(resultado)
            })
    }
}

module.exports = viagemController