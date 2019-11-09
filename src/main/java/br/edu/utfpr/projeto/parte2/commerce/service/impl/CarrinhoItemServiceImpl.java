package br.edu.utfpr.projeto.parte2.commerce.service.impl;

import br.edu.utfpr.projeto.parte2.commerce.model.CarrinhoItem;
import br.edu.utfpr.projeto.parte2.commerce.repository.CarrinhoItemRepository;
import br.edu.utfpr.projeto.parte2.commerce.service.CarrinhoItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

public class CarrinhoItemServiceImpl extends CrudServiceImpl<CarrinhoItem, Long>
    implements CarrinhoItemService {

    @Autowired
    private CarrinhoItemRepository carrinhoItemRepository;

    @Override
    protected JpaRepository<CarrinhoItem, Long> getRepository() {
        return this.carrinhoItemRepository;
    }
}
