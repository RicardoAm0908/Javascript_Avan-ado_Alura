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


}