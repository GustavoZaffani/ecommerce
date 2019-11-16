class Produto {

    /**
     * @class Classe responsável por manipular os produtos no ecommerce
     * */
    constructor(id, nome, precoVenda, imgCapa, qtdeParcelas, descAVista, tipo) {
        this.id = id;
        this.nome = nome;
        this.precoVenda = precoVenda;
        this.imgCapa  = imgCapa;
        this.qtdeParcelas = qtdeParcelas;
        this.descAVista = descAVista;
        this.tipo = tipo;
    }
}