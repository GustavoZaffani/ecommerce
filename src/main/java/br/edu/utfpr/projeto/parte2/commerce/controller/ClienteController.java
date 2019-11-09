package br.edu.utfpr.projeto.parte2.commerce.controller;

import br.edu.utfpr.projeto.parte2.commerce.model.Cliente;
import br.edu.utfpr.projeto.parte2.commerce.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequestMapping("cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;


    @PostMapping
    public ResponseEntity save(@Valid Cliente cliente,
                               BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        clienteService.save(cliente);
        return ResponseEntity.status(HttpStatus.OK).body(result.getAllErrors());
    }

    @GetMapping("api/{id}")
    @ResponseBody
    public Cliente findById(@PathVariable Long id, Model model) {
        return clienteService.findOne(id);
    }

    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        try {
            clienteService.delete(id);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
