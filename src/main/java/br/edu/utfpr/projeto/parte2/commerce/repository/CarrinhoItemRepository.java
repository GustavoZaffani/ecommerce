package br.edu.utfpr.projeto.parte2.commerce.repository;

import br.edu.utfpr.projeto.parte2.commerce.model.CarrinhoItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarrinhoItemRepository extends JpaRepository<CarrinhoItem, Long> {
}
