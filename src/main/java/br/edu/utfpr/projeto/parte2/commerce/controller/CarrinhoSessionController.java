package br.edu.utfpr.projeto.parte2.commerce.controller;

import br.edu.utfpr.projeto.parte2.commerce.model.*;
import br.edu.utfpr.projeto.parte2.commerce.service.ClienteService;
import br.edu.utfpr.projeto.parte2.commerce.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("session")
@SessionAttributes("carrinhoList")
public class CarrinhoSessionController {

    @Autowired
    ProdutoService produtoService;
    @Autowired
    ClienteService clienteService;
    private Boolean novoItem;
    private Integer qtde;

    @ModelAttribute("carrinhoList")
    private CarrinhoSession getCarrinho() {
        CarrinhoSession carrinhoSession = new CarrinhoSession();
        carrinhoSession.setCarrinhoItemSessions(new ArrayList<>());
        return carrinhoSession;
    }

    @GetMapping("add/{id}/{qtde}")
    public String addItemCarrinho(@PathVariable("id") Long id,
                                  @PathVariable("qtde") Integer qtde,
                                  @ModelAttribute("carrinhoList") CarrinhoSession carrinhoSession) {
        this.novoItem = true;
        if (carrinhoSession.getCarrinhoItemSessions().size() > 0) {
            carrinhoSession.getCarrinhoItemSessions().forEach(carrinhoItemSession -> {
                if (carrinhoItemSession.getIdProduto() == id) {
                    carrinhoItemSession.setQtde(carrinhoItemSession.getQtde() + qtde);
                    this.novoItem = false;
                }
            });
        }
        if (this.novoItem) {
            CarrinhoItemSession carrinhoItemSession = new CarrinhoItemSession();
            carrinhoItemSession.setIdProduto(id);
            carrinhoItemSession.setQtde(qtde);
            carrinhoSession.getCarrinhoItemSessions().add(carrinhoItemSession);
        } else {
            carrinhoSession.getCarrinhoItemSessions().removeIf(
                    carrinhoItemSession -> carrinhoItemSession.getQtde() == 0);
        }
        return "redirect:/";
    }

    @GetMapping
    @ResponseBody
    public List<CarrinhoItem> list(@ModelAttribute("carrinhoList") CarrinhoSession carrinhoSession) {
        List<CarrinhoItem> toReturn = new ArrayList<>();

        if (carrinhoSession.getCarrinhoItemSessions().size() > 0) {
            carrinhoSession.getCarrinhoItemSessions().forEach(carrinhoItemSession -> {
                Produto produto = produtoService.findOne(carrinhoItemSession.getIdProduto());

                CarrinhoItem carrinhoItem = new CarrinhoItem();
                carrinhoItem.setQtde(carrinhoItemSession.getQtde());
                carrinhoItem.setProduto(produto);
                carrinhoItem.setValor(produto.getPrecoVenda());
                toReturn.add(carrinhoItem);
            });
        }
        return toReturn;
    }

    @GetMapping("qtde")
    @ResponseBody
    public Integer getCountQtde(@ModelAttribute("carrinhoList") CarrinhoSession carrinhoSession) {
        qtde = 0;
        if (carrinhoSession.getCarrinhoItemSessions().size() > 0) {
            carrinhoSession.getCarrinhoItemSessions().forEach(carrinhoItemSession -> {
                qtde += carrinhoItemSession.getQtde();
            });
        }
        return qtde;
    }

    @GetMapping("remove/{id}")
    public String removeItemCarrinho(@PathVariable Long id,
                                     @ModelAttribute("carrinhoList") CarrinhoSession carrinhoSession) {
        if (carrinhoSession.getCarrinhoItemSessions().size() > 0) {
            carrinhoSession.getCarrinhoItemSessions().removeIf(carrinhoItemSession -> carrinhoItemSession.getIdProduto() == id);
        }
        return "carrinho";
    }

    @GetMapping("clear")
    public String clearItensCarrinho(Model model) {

        CarrinhoSession carrinhoSession = new CarrinhoSession();
        carrinhoSession.setCarrinhoItemSessions(new ArrayList<>());
        model.addAttribute("carrinhoList", carrinhoSession);
        return "redirect:/carrinho";
    }

    @GetMapping("add-frete/{frete}")
    @ResponseBody
    public ResponseEntity setFreteCarrinho(@ModelAttribute("carrinhoList") CarrinhoSession carrinhoSession,
                                           @PathVariable("frete") BigDecimal frete) {
        carrinhoSession.setTaxaEntrega(frete);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("frete")
    @ResponseBody
    public BigDecimal getFreteCarrinho(@ModelAttribute("carrinhoList") CarrinhoSession carrinhoSession) {
        return carrinhoSession.getTaxaEntrega() != null ? carrinhoSession.getTaxaEntrega() : new BigDecimal(0);
    }

    @GetMapping("endereco/save/{id}")
    @ResponseBody
    public ResponseEntity setEnderecoEntrega(@ModelAttribute("carrinhoList") CarrinhoSession carrinhoSession,
                                             @PathVariable("id") Long id) {
        carrinhoSession.setIdEnderecoEntrega(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("endereco/{user}")
    @ResponseBody
    public Endereco getEnderecoEntrega(@ModelAttribute("carrinhoList") CarrinhoSession carrinhoSession,
                                       @PathVariable("user") String user) {
        carrinhoSession.setUserCliente(user);
            List<Endereco> enderecosList = clienteService.findByUsername(user).getEnderecosList();
        return enderecosList.stream().filter(endereco -> endereco.getId() == carrinhoSession.getIdEnderecoEntrega()).collect(Collectors.toList()).get(0);
    }

    @GetMapping("dados-session")
    @ResponseBody
    public CarrinhoSession getDadosSession(@ModelAttribute("carrinhoList") CarrinhoSession carrinhoSession) {
        return carrinhoSession;
    }

}
