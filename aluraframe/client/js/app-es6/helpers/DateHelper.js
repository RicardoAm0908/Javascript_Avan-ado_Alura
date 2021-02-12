export class DateHelper{

    constructor() {
        throw new Error('Esta classe não pode ser instanciada')
    }

    static textToDate(text){
        if(!/\d{4}-\d{2}-\d{2}/.test(text)) 
            throw new Error('Deve estar no formato yyyy-mmm-dd');
            
        return new Date(...text.split('-').map((item, indice) => item - indice % 2));
    }

    static dateToText(date){
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` 
    }
}