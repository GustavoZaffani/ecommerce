package br.edu.utfpr.projeto.parte2.commerce.controller;

import br.edu.utfpr.projeto.parte2.commerce.model.CarrinhoItem;
import br.edu.utfpr.projeto.parte2.commerce.model.CarrinhoSession;
import br.edu.utfpr.projeto.parte2.commerce.model.Produto;
import br.edu.utfpr.projeto.parte2.commerce.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("session")
@SessionAttributes("carrinhoList")
public class CarrinhoSessionController {

    @Autowired
    ProdutoService produtoService;
    private Boolean novoItem;
    private Integer qtde;

    @ModelAttribute("carrinhoList")
    private List<CarrinhoSession> getCarrinhoList() {
        return new ArrayList<>();
    }

    @GetMapping("add/{id}/{qtde}")
    public String addItemCarrinho(@PathVariable("id") Long id,
                                  @PathVariable("qtde") Integer qtde,
                                  @ModelAttribute("carrinhoList") List<CarrinhoSession> carrinhoSessions) {
        this.novoItem = true;
        carrinhoSessions.forEach(carrinhoSession -> {
            if (carrinhoSession.getIdProduto() == id) {
                carrinhoSession.setQtde(carrinhoSession.getQtde() + qtde);
                this.novoItem = false;
            }
        });
        if (this.novoItem) {
            CarrinhoSession carrinhoSession = new CarrinhoSession();
            carrinhoSession.setIdProduto(id);
            carrinhoSession.setQtde(qtde);
            carrinhoSessions.add(carrinhoSession);
        }
        return "redirect:/";
    }

    @GetMapping
    @ResponseBody
    public List<CarrinhoItem> list(@ModelAttribute("carrinhoList") List<CarrinhoSession> carrinhoSessions) {
        List<CarrinhoItem> toReturn = new ArrayList<>();
        carrinhoSessions.forEach(carrinhoSession -> {
            Produto produto = produtoService.findOne(carrinhoSession.getIdProduto());

            CarrinhoItem carrinhoItem = new CarrinhoItem();
            carrinhoItem.setQtde(carrinhoSession.getQtde());
            carrinhoItem.setProduto(produto);
            carrinhoItem.setValor(produto.getPrecoVenda());
            toReturn.add(carrinhoItem);
        });
        return toReturn;
    }

    @GetMapping("qtde")
    @ResponseBody
    public Integer getCountQtde(@ModelAttribute("carrinhoList") List<CarrinhoSession> carrinhoSessions) {
        qtde = 0;
        carrinhoSessions.forEach(carrinhoSession -> {
            qtde += carrinhoSession.getQtde();
        });
        return qtde;
    }

    @GetMapping("remove/{id}")
    public String removeItemCarrinho(@PathVariable Long id,
                                     Model model,
                                     @ModelAttribute("carrinhoList") List<CarrinhoSession> carrinhoSessions) {
        carrinhoSessions.removeIf(carrinhoSession -> carrinhoSession.getIdProduto() == id);
        return "carrinho";
    }

    @GetMapping("clear")
    public String clearItensCarrinho(@ModelAttribute("carrinhoList") List<CarrinhoSession> carrinhoSessions) {
        carrinhoSessions = new ArrayList<>();
        return "redirect:/carrinho";
    }
}
