package br.edu.utfpr.projeto.parte2.commerce.enumeration;

public enum TipoEndereco {

    P("Principal"),
    C("Cobrança"),
    A("Alternativo");

    private String tipoEndereco;

    TipoEndereco (String tipoEndereco) {
        this.tipoEndereco = tipoEndereco;
    }

    public String getTipoEndereco() {
        return tipoEndereco;
    }

    @Override
    public String toString() {
        return tipoEndereco;
    }
}
