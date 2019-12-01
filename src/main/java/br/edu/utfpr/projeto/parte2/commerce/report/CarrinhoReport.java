package br.edu.utfpr.projeto.parte2.commerce.report;

import net.sf.jasperreports.engine.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.ResourceLoader;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@Transactional
@Repository
public class CarrinhoReport {

    @Autowired
    @Qualifier("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private ResourceLoader resourceLoader;

    public JasperPrint generateReport(String caminho,
                                      Long idCarrinho) throws JRException, SQLException, IOException {

        Connection conn = jdbcTemplate.getDataSource().getConnection();
        String path = resourceLoader.getResource(caminho).getURI().getPath();

        JasperReport jasperReport = JasperCompileManager.compileReport(path);

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("ID_CARRINHO", idCarrinho);

        JasperPrint print = JasperFillManager.fillReport(jasperReport,
                parameters, conn);

        return print;
    }
}
