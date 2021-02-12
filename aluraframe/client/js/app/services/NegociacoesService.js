class NegociacoesService {

    constructor () {
        this._http = new HttpService();        
    }


    obterNegociacoesSemana () {     
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/semana')
            .then(negociacoes => 
                resolve (negociacoes.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor)))
            ).catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações');
            });
        });
    }

    obterNegociacoesSemanaAnterior () {

        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/anterior')
            .then(negociacoes => 
                resolve (negociacoes.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor)))
            ).catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações');
            });
        });
    }

    obterNegociacoesSemanaRetrasada () {

        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/retrasada')
            .then(negociacoes => 
                resolve (negociacoes.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor)))
            ).catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações');
            });
        });

    }


    obterNegociacoes() {        
        return Promise.all([
            this.obterNegociacoesSemana(),
            this.obterNegociacoesSemanaAnterior(),
            this.obterNegociacoesSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
	} 

    cadastra(negociacao){
        return ConnectionFactory
            .getConnection()
            .then(connection =>  new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso')              
            .catch(erro => {
                console.log(erro);
                throw new Error ('Não foi possível adicionar a negociação');
            });
    }

    lista() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível buscar as negociações');
            });           
    }


    apaga () {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => {
                'Negociações removidas com sucesso'
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Falha ao apagar as negociações');
            });       
    }


    importa(lista) {
        return this.obterNegociacoes()
            .then(negociacoes => 
                negociacoes.filter(item => 
                    !lista.negociacoes.some(obj => 
                        JSON.stringify(obj) == JSON.stringify(item)
                    )
                )
            )
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível buscar negociações para importar');
            } );             
    }

}