class NegociacoesView extends View {

    constructor(element){
        super(element);
    }

    template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th onclick="negociacaoController.ordena('data')">DATA</th>
                    <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                    <th onclick="negociacaoController.ordena('valor')">VALOR</th>
                    <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
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
