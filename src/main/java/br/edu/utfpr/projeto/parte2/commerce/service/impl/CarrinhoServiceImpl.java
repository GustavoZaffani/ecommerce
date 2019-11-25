package br.edu.utfpr.projeto.parte2.commerce.service.impl;

import br.edu.utfpr.projeto.parte2.commerce.enumeration.Situacao;
import br.edu.utfpr.projeto.parte2.commerce.model.Carrinho;
import br.edu.utfpr.projeto.parte2.commerce.model.CarrinhoItem;
import br.edu.utfpr.projeto.parte2.commerce.model.CarrinhoItemSession;
import br.edu.utfpr.projeto.parte2.commerce.model.CarrinhoSession;
import br.edu.utfpr.projeto.parte2.commerce.repository.CarrinhoRepository;
import br.edu.utfpr.projeto.parte2.commerce.service.CarrinhoService;
import br.edu.utfpr.projeto.parte2.commerce.service.ClienteService;
import br.edu.utfpr.projeto.parte2.commerce.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarrinhoServiceImpl extends CrudServiceImpl<Carrinho, Long>
        implements CarrinhoService {

    @Autowired
    private CarrinhoRepository carrinhoRepository;
    @Autowired
    private ClienteService clienteService;
    @Autowired
    private ProdutoService produtoService;

    @Override
    protected JpaRepository<Carrinho, Long> getRepository() {
        return this.carrinhoRepository;
    }

    @Override
    public void finalizaCarrinho(CarrinhoSession carrinhoSession) {
        Carrinho carrinho = new Carrinho();
        carrinho.setDtVenda(LocalDate.now());
        carrinho.setCliente(clienteService.findByUsername(carrinhoSession.getUserCliente()));
        carrinho.setTaxaFrete(carrinhoSession.getTaxaEntrega());
        carrinho.setEnderecoEntrega(
                carrinho.getCliente().getEnderecosList()
                        .stream()
                        .filter(endereco -> endereco.getId() == carrinhoSession.getIdEnderecoEntrega()).collect(Collectors.toList()).get(0)
        );
        List<CarrinhoItem> carrinhoItems = buildItensCarrinho(carrinhoSession.getCarrinhoItemSessions());
        carrinhoItems.forEach(carrinhoItem -> carrinhoItem.setCarrinho(carrinho));
        carrinho.setCarrinhoItemList(carrinhoItems);
        carrinho.setSituacao(Situacao.AA);
        this.save(carrinho);
    }

    @Override
    public List<Carrinho> findByClienteUsernameEquals(String username) {
        return carrinhoRepository.findByClienteUsernameEquals(username);
    }

    @Override
    public void updateSituacao(Long idCarrinho, Situacao situacao) {
        Carrinho c = this.findOne(idCarrinho);
        c.setSituacao(situacao);
        this.save(c);
    }

    private List<CarrinhoItem> buildItensCarrinho(List<CarrinhoItemSession> carrinhoItemSessions) {
        List<CarrinhoItem> toReturn = new ArrayList<>();
        carrinhoItemSessions.forEach(carrinhoItemSession -> {
            CarrinhoItem carrinhoItem = new CarrinhoItem();
            carrinhoItem.setProduto(produtoService.findOne(carrinhoItemSession.getIdProduto()));
            carrinhoItem.setQtde(carrinhoItemSession.getQtde());
            carrinhoItem.setValor(carrinhoItem.getProduto().getPrecoVenda());
            toReturn.add(carrinhoItem);
        });
        return toReturn;
    }
}
