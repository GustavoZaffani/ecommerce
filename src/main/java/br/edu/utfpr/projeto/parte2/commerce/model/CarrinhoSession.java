package br.edu.utfpr.projeto.parte2.commerce.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CarrinhoSession {

    private BigDecimal taxaEntrega;
    private Endereco enderecoEntrega;
    private List<CarrinhoItemSession> carrinhoItemSessions;
}
