package br.edu.utfpr.projeto.parte2.commerce.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("home")
public class HomeController {

	@GetMapping
	public String home() {
		return "index";
	}
}
