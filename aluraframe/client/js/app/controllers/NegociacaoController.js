class NegociacaoController {
    constructor (){
        let $ = document.querySelector.bind(document);
    
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");     

        this._lista = new Bind(new ListaNegociacoes(), new NegociacoesView($("#tableNegociacoes")), 'adiciona', 'esvazia');
        this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto');    
    }

    adiciona(event){
        event.preventDefault();
       this._lista.adiciona(this._criaNegociacao());       
       this._mensagem.texto = "Negociação adicionada com sucesso!"
       this._limpaFormulario();
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        )
    }


    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    apaga() {
        this._lista.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }

    
}