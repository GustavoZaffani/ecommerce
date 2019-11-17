package br.edu.utfpr.projeto.parte2.commerce.repository;

import br.edu.utfpr.projeto.parte2.commerce.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findByNomeLikeIgnoreCase(String nome);

    List<Produto> findByTipoEquals(String tipo);
}
