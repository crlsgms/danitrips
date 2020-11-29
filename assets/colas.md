# nested

dicas de relação pra nested forms
https://www.sicara.ai/blog/2018-06-27-custom-nested-validated-forms-with-react


# backend
 Projeto Viagem
    Cliente
    Viagem

    1 cliente pode fazer N viagens
    1 viagem é feita por 1 cliente

    clientes: {rg, nome, endereço}
    viagem: {cidade, data, preço}


    paciente = viagem
      medico = cliente






            nome: req.body.nome,
            rg: req.body.rg,
            rua: req.body.rua,
            numero: req.body.numero,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            viagens: req.body.viagens


## separando os requests do controler por atomicidade
module.exports = [
    {
        path: '/',
        method: 'get', action: 'find'
    },
    {
        path: '/',
        method: 'post', action: 'create'
    },
    {
        path: '/schema',
        method: 'get', action: 'getSchema'
    },
    {
        path: '/filter',
        method: 'get', action: 'findByFilter'
    },
    {
        path: '/populate',
        method: 'get', action: 'findAllPopulate'
    },
    {
        path: '/:id',
        method: 'get', action: 'findById'
    },
    {
        path: '/:id/populate',
        method: 'get', action: 'findByIdPopulate'
    },
    {
        path: '/:id',
        method: 'put', action: 'update'
    },
    {
        path: '/:id',
        method: 'delete', action: 'remove'
    },
]           


## viagens atualiza, original
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


## testes com spread
atualiza: async (req, res) => {
        Viagem.updateOne({ _id: req.params.id }, {
            //recupera o valor atual do produto 
            const trip = { ...this.state.trip }
        // alterao valor com o input do usuario
            trip[e.target.name] = e.target.value
        //altera com o spread os dados inseridos
            this.setState({ trip })
        })
            .then(resultado => {
                console.log('Viagem Atualizada com Sucesso!')
                res.json(resultado)
            })
    }


##
    atualiza: async (req, res) => {
        // pra decidir qual desses spread usar tem que qual versão 
        // do ecma script a aplicação está usando 
        // por estar usando arrow fuction acho que qualquer uma delas vai dar certo 
        //const { trip } = req.body; 
        const trip = { ...req.body }
        // Como está pasando o trip o objeto todo, acredito que ele vai subtstituir
        // mudando o que mudou e mantendo o que tinha tem que só ter cuidado pra ver 
        // se o id não tá dentro do trip
        Viagem.updateOne({ _id: req.params.id }, trip)
            .then(resultado => {
                console.log('Viagem Atualizada com Sucesso!')
                res.json(resultado)
            })
    }