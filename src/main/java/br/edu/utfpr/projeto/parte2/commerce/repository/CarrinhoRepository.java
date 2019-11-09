package br.edu.utfpr.projeto.parte2.commerce.repository;

import br.edu.utfpr.projeto.parte2.commerce.model.Carrinho;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
}
