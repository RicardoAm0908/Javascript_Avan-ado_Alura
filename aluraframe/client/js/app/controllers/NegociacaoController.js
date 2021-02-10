class NegociacaoController {
    constructor (){
        let $ = document.querySelector.bind(document);
    
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");     

        this._negociacoesView = new NegociacoesView($("#tableNegociacoes"));
        let self = this;
        this._lista = new Proxy(new ListaNegociacoes(), {
            get: function(target, prop, receiver){
                if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)){
                    return function() {
                        Reflect.apply(target[prop], target, arguments);
                        self._negociacoesView.update(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        });
        
        this._negociacoesView.update(this._lista);
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($("#mensagemView"));
        
    }

    adiciona(event){
        event.preventDefault();

       this._lista.adiciona(this._criaNegociacao());
       
       this._mensagem.texto = "Negociação adicionada com sucesso!"
       this._mensagemView.update(this._mensagem);
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
        this._mensagemView.update(this._mensagem);
    }

    
}