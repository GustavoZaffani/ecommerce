package br.edu.utfpr.projeto.parte2.commerce.controller;

import br.edu.utfpr.projeto.parte2.commerce.model.Carrinho;
import br.edu.utfpr.projeto.parte2.commerce.model.CarrinhoSession;
import br.edu.utfpr.projeto.parte2.commerce.service.CarrinhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("carrinho")
public class CarrinhoController {

    @Autowired
    CarrinhoService carrinhoService;

    @GetMapping
    public String goToCarrinho() {
        return "carrinho";
    }

    @PostMapping
    public ResponseEntity finalizaCarrinho(@RequestBody CarrinhoSession carrinhoSession) {
        try {
            carrinhoService.finalizaCarrinho(carrinhoSession);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.ok(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("find-all")
    @ResponseBody
    public List<Carrinho> findAll() {
        return carrinhoService.findAll();
    }
}
