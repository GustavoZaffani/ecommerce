package br.edu.utfpr.projeto.parte2.commerce.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("detalhe")
public class PagineInternaController {


    @GetMapping("{id}")
    public String getDetalhesProduto(@PathVariable("id") Long id) {
        return "paginaProduto";
    }
}
