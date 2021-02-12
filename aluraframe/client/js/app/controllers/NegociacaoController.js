class NegociacaoController {
    constructor (){
        let $ = document.querySelector.bind(document);
    
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");     

        this._lista = new Bind(new ListaNegociacoes(), new NegociacoesView($("#tableNegociacoes")), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
        this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto');    

        this._ordemAtual = '';

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes => negociacoes.forEach(item => { this._lista.adiciona(item) }))
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = erro;
            });            
    }

    adiciona(event){

        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(connection => {
                let negociacao = this._criaNegociacao();
                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(() => {
                        this._lista.adiciona(negociacao);       
                        this._mensagem.texto = "Negociação adicionada com sucesso!"
                        this._limpaFormulario();
                    });
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textToDate(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }


    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    apaga() {
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => {
                this._lista.esvazia();
                this._mensagem.texto = mensagem;
            })
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = erro;
            });            


    }


    importaNegociacoes() {
        let service = new NegociacoesService();

        Promise.all([service.obterNegociacoesSemana(), service.obterNegociacoesSemanaAnterior(), service.obterNegociacoesSemanaRetrasada()])
                .then(negociacoes =>{
                    negociacoes
                        .reduce((aux, array) => aux.concat(array) , [])
                        .forEach(item => this._lista.adiciona(item));
                    this._mensagem.texto = 'Negociações importadas com sucesso';
                })
                .catch(error => this._mensagem.texto = error);
    }

    ordena(coluna){
        if(this._ordemAtual == coluna){
            this._lista.inverteOrdem();
        }else{
            this._lista.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }


    
    
}