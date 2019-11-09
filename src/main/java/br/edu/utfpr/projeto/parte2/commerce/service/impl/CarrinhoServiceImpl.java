package br.edu.utfpr.projeto.parte2.commerce.service.impl;

import br.edu.utfpr.projeto.parte2.commerce.model.Carrinho;
import br.edu.utfpr.projeto.parte2.commerce.repository.CarrinhoRepository;
import br.edu.utfpr.projeto.parte2.commerce.service.CarrinhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class CarrinhoServiceImpl extends CrudServiceImpl<Carrinho, Long>
    implements CarrinhoService {

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Override
    protected JpaRepository<Carrinho, Long> getRepository() {
        return this.carrinhoRepository;
    }
}
