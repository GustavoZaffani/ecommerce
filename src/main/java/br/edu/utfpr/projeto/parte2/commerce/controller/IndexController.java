package br.edu.utfpr.projeto.parte2.commerce.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping("")
    public String index() {
        return "index";
    }
}
