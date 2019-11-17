package br.edu.utfpr.projeto.parte2.commerce.model;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CarrinhoSession {

    private Long idProduto;
    private BigDecimal qtde;
}
