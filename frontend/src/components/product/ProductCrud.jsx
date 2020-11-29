import Axios from 'axios'
import React, { Component } from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'camera-retro',
    title: 'Produtos',
    subtitle: 'Cadastro de Produtos: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/products'
const initialState = {
    product: { description: '', price: '', qty: '' },
    list: []
}

export default class ProductCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        // consome a API com GET (por padrao)
        // altera a variavel list com os dados da resposta do GET
        // trazendo todos os produtos
        Axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    updateField(e) {
        //recupera o valor atual do produto 
        const product = { ...this.state.product }
        // alterao valor com o input do usuario
        product[e.target.name] = e.target.value
        //altera com o spread os dados inseridos
        this.setState({ product })
    }

    salvar() {
        //recupera o valor atual do produto
        const product = this.state.product
        // descobrir se tem o produto,ou sera um novo (id existente ou não)
        const metodo = product.id ? 'put' : 'post'
        const url = product.id ? `${baseUrl}/${product.id}` : `${baseUrl}`
        // chamada da API
        Axios[metodo](url, product)
            .then(resposta => {
                // recupera a lista atualizada
                const list = this.getUpdatedList(resposta.data)
                // atualiza efetivamente a lista
                this.setState({ product: initialState.product, list })
            })
    }

    getUpdatedList(product, add = true) {
        //recupera lista de produtos sem o novo produto
        const list = this.state.list.filter(p => p.id !== product.id)
        if (add) {
            list.unshift(product) // ordena para o mais recente
        }
        return list
    }

    renderForm() {
        return (
            <form>
                <div className="form-group">
                    <label> Descrição </label>
                    <input onChange={e => this.updateField(e)} name="description" type="text" className="form-control" value={this.state.product.description} />
                </div>
                <div className="form-group">
                    <label> Preço </label>
                    <input onChange={e => this.updateField(e)} name="price" type="number" className="form-control" value={this.state.product.price} />
                </div>
                <div className="form-group">
                    <label> Quantidade </label>
                    <input onChange={e => this.updateField(e)} name="qty" type="number" className="form-control" value={this.state.product.qty} />
                </div>
                <div className="form-group">
                    <button onClick={e => this.salvar()} type="button" className="btn btn-primary"> Cadastrar </button>
                </div>
            </form>
        )

    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    atualiza(product) {
        this.setState({ product })
    }

    remove(product) {
        Axios.delete(`${baseUrl}/${product.id}`)
            .then(resp => {
                //recupera a lista atualizada, sem o produto que foi removido
                const list = this.getUpdatedList(product, false)
                this.setState({ list })
            }
            )
    }

    renderRows() {
        // a função map faz um for no vetor list, para cada product
        return this.state.list.map(product => {
            return (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.qty}</td>
                    <td>
                        <button className="btn btn-warning" onClick={e => this.atualiza(product)}> <i className="fa fa-pencil"></i></button>
                        <button className="btn btn-danger ml-2" onClick={e => this.remove(product)}> <i className="fa fa-trash"></i></button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }

}