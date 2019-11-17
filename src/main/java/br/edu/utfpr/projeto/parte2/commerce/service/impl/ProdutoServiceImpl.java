package br.edu.utfpr.projeto.parte2.commerce.service.impl;

import br.edu.utfpr.projeto.parte2.commerce.model.Produto;
import br.edu.utfpr.projeto.parte2.commerce.repository.ProdutoRepository;
import br.edu.utfpr.projeto.parte2.commerce.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoServiceImpl extends CrudServiceImpl<Produto, Long>
        implements ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Override
    protected JpaRepository<Produto, Long> getRepository() {
        return produtoRepository;
    }

    @Override
    public List<Produto> complete(String nome) {
        return produtoRepository.findByNomeLikeIgnoreCase("%" + nome + "%");
    }

    @Override
    public List<Produto> findByTipoEquals(String tipo) {
        return produtoRepository.findByTipoEquals(tipo);
    }
}
