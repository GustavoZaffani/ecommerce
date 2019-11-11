package br.edu.utfpr.projeto.parte2.commerce.controller;

import br.edu.utfpr.projeto.parte2.commerce.model.Cliente;
import br.edu.utfpr.projeto.parte2.commerce.model.Permissao;
import br.edu.utfpr.projeto.parte2.commerce.service.ClienteService;
import br.edu.utfpr.projeto.parte2.commerce.service.PermissaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@Controller
@RequestMapping("cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private PermissaoService permissaoService;

    @PostMapping
    public ResponseEntity save(@RequestBody @Valid Cliente cliente,
                               BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        Set<Permissao> permissoes = new HashSet<>();
        permissoes.add(permissaoService.findOne(2));
        cliente.getEnderecosList().forEach(endereco -> endereco.setCliente(cliente));
        cliente.setPermissoes(permissoes);
        cliente.setPassword(new BCryptPasswordEncoder().encode(cliente.getPassword()));
        clienteService.save(cliente);
        return ResponseEntity.status(HttpStatus.OK).body(result.getAllErrors());
    }

    @GetMapping("api/{id}")
    @ResponseBody
    public Cliente findById(@PathVariable Long id, Model model) {
        return clienteService.findOne(id);
    }

    @GetMapping
    @ResponseBody
    public Cliente findByUsername(@RequestParam("user") String username) {
        return clienteService.findByUsername(username);
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