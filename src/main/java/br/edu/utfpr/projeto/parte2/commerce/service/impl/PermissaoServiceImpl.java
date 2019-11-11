package br.edu.utfpr.projeto.parte2.commerce.service.impl;

import br.edu.utfpr.projeto.parte2.commerce.model.Permissao;
import br.edu.utfpr.projeto.parte2.commerce.repository.PermissaoRepository;
import br.edu.utfpr.projeto.parte2.commerce.service.PermissaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class PermissaoServiceImpl extends CrudServiceImpl<Permissao, Integer>
        implements PermissaoService {

    @Autowired
    private PermissaoRepository permissaoRepository;

    @Override
    protected JpaRepository<Permissao, Integer> getRepository() {
        return permissaoRepository;
    }
}
