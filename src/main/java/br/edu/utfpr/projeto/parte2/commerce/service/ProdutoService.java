package br.edu.utfpr.projeto.parte2.commerce.service;

import br.edu.utfpr.projeto.parte2.commerce.model.Produto;

import java.util.List;

public interface ProdutoService extends CrudService<Produto, Long> {

    List<Produto> complete(String nome);

    List<Produto> findByTipoEquals(String tipo);
}
