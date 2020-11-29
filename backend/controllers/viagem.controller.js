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
    // o updateOne precisa trazer todos os campos, na doc do mongo achei uma alternatira pra tentar o spread
    // https://mongoosejs.com/docs/tutorials/findoneandupdate.html
    // troquei a linha do updateOne por FindAndUPdateOne, e adicionei no server.js a linha 23 find and modify
    // mesmo assim não rola, se não passar todos os campos os que não foram grava null
    atualiza: async (req, res)=>{
        Viagem.findOneAndUpdate({_id: req.params.id},{
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