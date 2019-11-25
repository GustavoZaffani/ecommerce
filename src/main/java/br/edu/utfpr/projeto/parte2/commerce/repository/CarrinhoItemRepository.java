package br.edu.utfpr.projeto.parte2.commerce.repository;

import br.edu.utfpr.projeto.parte2.commerce.model.Carrinho;
import br.edu.utfpr.projeto.parte2.commerce.model.CarrinhoItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarrinhoItemRepository extends JpaRepository<CarrinhoItem, Long> {

}
