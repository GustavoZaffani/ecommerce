class Produto {

    /**
     * @class Classe responsável por manipular os produtos no ecommerce
     * */
    constructor(id, nome, precoVenda, caminhoCapa, qtdeParcelas, descAVista, tipo) {
        this.id = id;
        this.nome = nome;
        this.precoVenda = precoVenda;
        this.caminhoCapa = caminhoCapa;
        this.qtdeParcelas = qtdeParcelas;
        this.descAVista = descAVista;
        this.tipo = tipo;
    }
}