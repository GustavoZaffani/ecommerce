package br.edu.utfpr.projeto.parte2.commerce.repository;

import br.edu.utfpr.projeto.parte2.commerce.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
