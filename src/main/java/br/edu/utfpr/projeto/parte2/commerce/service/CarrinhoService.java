package br.edu.utfpr.projeto.parte2.commerce.service;

import br.edu.utfpr.projeto.parte2.commerce.enumeration.Situacao;
import br.edu.utfpr.projeto.parte2.commerce.model.Carrinho;
import br.edu.utfpr.projeto.parte2.commerce.model.CarrinhoSession;

import java.util.List;

public interface CarrinhoService extends CrudService<Carrinho, Long> {

    void finalizaCarrinho(CarrinhoSession carrinhoSession);

    List<Carrinho> findByClienteUsernameEquals(String username);

    void updateSituacao(Long idCarrinho, Situacao situacao);

    Long getMaxId();
}
