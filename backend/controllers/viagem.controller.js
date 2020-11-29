const Viagem = require("../models/viagem.model")

let viagemController = {
    insere: async (req, res) => {
        let viagem = Viagem({
            cidade: req.body.cidade,
            data: req.body.data,
            preco: req.body.preco,
            cliente: req.body.cliente
        })
        viagem.save()
        res.json(viagem)
    },
    consulta: async (req, res) => {
        if(req.params.id == undefined){
            Viagem.find()
            .populate('cliente')
            .exec()
            .then( viagens => {
                res.json(viagens)
            })
        }else{
            Viagem.findOne({_id: req.params.id})
            .populate('cliente')
            .exec()
            .then(viagem => {
                res.json(viagem)
            })
        }
        
    },
    remove: async (req, res)=>{
        Viagem.deleteOne({_id: req.params.id})
        .then(resultado=>{
            console.log('Viagem Removida com Sucesso!')
            res.json(resultado)
        })
    },
    atualiza: async (req, res)=>{
        Viagem.updateOne({_id: req.params.id},{
            cidade: req.body.cidade,
            data: req.body.data,
            preco: req.body.preco,
            cliente: req.body.cliente
        })
        .then(resultado=>{
            console.log('Viagem Atualizada com Sucesso!')
            res.json(resultado)
        })
    }
}

module.exports = viagemController