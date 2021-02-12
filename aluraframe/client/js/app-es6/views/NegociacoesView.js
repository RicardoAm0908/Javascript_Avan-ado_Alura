import { View } from './View.js';
import { DateHelper } from '../helpers/DateHelper.js';
import { currentInstance } from '../controllers/NegociacaoController.js';

export class NegociacoesView extends View {

    constructor(element){
        super(element);

        element.addEventListener('click', function(event){
            if(event.target.nodeName == 'TH'){
                currentInstance().ordena(event.target.textContent.toLowerCase());
            }
        });
    }

    template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${model.negociacoes.map(item =>  `

                    <tr>
                        <td>${DateHelper.dateToText(item.data)}</td>
                        <td>${item.quantidade}</td>
                        <td>${item.valor}</td>
                        <td>${item.volume}</td>
                    </tr>

                `).join('')}
            </tbody>
            
            <tfoot>
                <td colspan="3"><b>Total:</b></td>
                <td>${model.negociacoes.reduce((total, item) => total + item.volume, 0.0)}</td>
            </tfoot>
        </table>      
        `;
    }
}
