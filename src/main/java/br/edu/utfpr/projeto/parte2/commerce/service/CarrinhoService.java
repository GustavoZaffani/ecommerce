package br.edu.utfpr.projeto.parte2.commerce.service;

import br.edu.utfpr.projeto.parte2.commerce.model.Carrinho;
import br.edu.utfpr.projeto.parte2.commerce.model.CarrinhoSession;

public interface CarrinhoService extends CrudService<Carrinho, Long> {

    void finalizaCarrinho(CarrinhoSession carrinhoSession);
}
