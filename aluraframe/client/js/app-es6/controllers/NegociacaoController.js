import { MensagemView } from '../views/MensagemView.js';
import { NegociacoesView } from '../views/NegociacoesView.js'; 
import { ListaNegociacoes } from '../models/ListaNegociacoes.js'; 
import { Mensagem } from '../models/Mensagem.js';
import { Negociacao } from '../models/Negociacao.js';
import { NegociacoesService } from '../services/NegociacoesService.js';
import { DateHelper } from '../helpers/DateHelper.js';
import { Bind } from '../helpers/Bind.js';


class NegociacaoController {
    constructor (){
        let $ = document.querySelector.bind(document);
    
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");     
        this._lista = new Bind(new ListaNegociacoes(), new NegociacoesView($("#tableNegociacoes")), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
        this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto');    
        
        this._ordemAtual = '';
        this._service = new NegociacoesService();        
        this._init();      
    }

    _init(){
        this._service
            .lista()
            .then(negociacoes => 
                negociacoes.forEach(item => 
                    { this._lista.adiciona(item) }
                )
            )
            .catch(erro => this._mensagem.texto = erro);              

        setInterval(() => {
            this._importaNegociacoes();
        }, 3000);
    }

    adiciona(event){

        event.preventDefault();
        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._lista.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
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
        this._service
        .apaga()
        .then(mensagem => {
            this._lista.esvazia();
                this._mensagem.texto = mensagem;
        })
        .catch(erro => this._mensagem.texto = erro);              
    }

    _importaNegociacoes() {


        this._service
            .importa(this._lista)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._lista.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'   
            }))
            .catch(erro => this._mensagem.texto = erro); 
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
let negociacaoController = new NegociacaoController();
export function currentInstance() {
    return negociacaoController;
}