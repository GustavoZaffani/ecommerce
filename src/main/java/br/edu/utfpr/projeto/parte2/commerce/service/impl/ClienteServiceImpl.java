package br.edu.utfpr.projeto.parte2.commerce.service.impl;

import br.edu.utfpr.projeto.parte2.commerce.model.Cliente;
import br.edu.utfpr.projeto.parte2.commerce.repository.ClienteRepository;
import br.edu.utfpr.projeto.parte2.commerce.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class ClienteServiceImpl extends CrudServiceImpl<Cliente, Long>
    implements ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    protected JpaRepository<Cliente, Long> getRepository() {
        return this.clienteRepository;
    }
}
