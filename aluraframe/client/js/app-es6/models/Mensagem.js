class Mensagem {
    constructor(text = '') {
        this._texto = text;
    }

    get texto(){
        return this._texto;
    }

    set texto(text){
        this._texto = text;
    }

}