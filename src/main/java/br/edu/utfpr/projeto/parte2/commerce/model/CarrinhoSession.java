package br.edu.utfpr.projeto.parte2.commerce.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CarrinhoSession {

    private BigDecimal taxaEntrega;
    private Long idEnderecoEntrega;
    private List<CarrinhoItemSession> carrinhoItemSessions;
    private String userCliente;
}
