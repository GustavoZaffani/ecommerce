package br.edu.utfpr.projeto.parte2.commerce.enumeration;

public enum Situacao {

    AA("Aguardando aprovação"),
    PA("Pagamento aprovado"),
    ES("Em separação"),
    ET("Enviado à transportadora"),
    SE("Saiu para entrega"),
    PE("Pedido entrege");

    private String situacao;

    Situacao(String situacao) {
        this.situacao = situacao;
    }

    public String getSituacao() {
        return situacao;
    }

    @Override
    public String toString() {
        return situacao;
    }
}

