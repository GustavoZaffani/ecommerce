package br.edu.utfpr.projeto.parte2.commerce.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("carrinho")
public class CarrinhoController {

    @GetMapping
    public String goToCarrinho() {
        return "carrinho";
    }
}
