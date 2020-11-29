const Cliente = require("../models/cliente.model")


// pesquisar ecma / spread pra não ter que passar parametros e usar o model clienteC
let clienteController = {
    insere: async (req, res) => {
        let cliente = Cliente({
            nome: req.body.nome,
            rg: req.body.rg,
            rua: req.body.rua,
            numero: req.body.numero,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            viagens: req.body.viagens
        })
        cliente.save()
        res.json(cliente)
    },
    consulta: async (req, res) => {
        if(req.params.id == undefined){
            Cliente.find()
            .populate('viagens')
            .exec()
            .then( clientes => {
                res.json(clientes)
            })
        }else{
            Cliente.findOne({_id: req.params.id})
            .populate('viagens')
            .exec()
            .then(cliente => {
                res.json(cliente)
            })
        }
        
    },
    remove: async (req, res)=>{
        Cliente.deleteOne({_id: req.params.id})
        .then(resultado=>{
            console.log('Cliente Removido com Sucesso!')
            res.json(resultado)
        })
    },
    //updateOne ou findOneAndUpdate pra não perder os outros campos
    // não consegui implementar, estudar colas.md
    atualiza: async (req, res)=>{
        Cliente.findOneAndUpdate({_id: req.params.id},{
            nome: req.body.nome,
            rg: req.body.rg,
            rua: req.body.rua,
            numero: req.body.numero,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            viagens: req.body.viagens
        })
        .then(resultado=>{
            console.log('Cliente Atualizado com Sucesso!')
            res.json(resultado)
        })
    }
    
}

module.exports = clienteController