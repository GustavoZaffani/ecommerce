package br.edu.utfpr.projeto.parte2.commerce.controller;

import br.edu.utfpr.projeto.parte2.commerce.enumeration.Situacao;
import br.edu.utfpr.projeto.parte2.commerce.model.Carrinho;
import br.edu.utfpr.projeto.parte2.commerce.model.CarrinhoSession;
import br.edu.utfpr.projeto.parte2.commerce.report.CarrinhoReport;
import br.edu.utfpr.projeto.parte2.commerce.service.CarrinhoService;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperPrint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.List;

@Controller
@RequestMapping("carrinho")
public class CarrinhoController {

    @Autowired
    CarrinhoService carrinhoService;

    @Autowired
    CarrinhoReport carrinhoReport;

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

    @GetMapping("max")
    @ResponseBody
    public Long getLastIdCarrinho() {
        return carrinhoService.getMaxId();
    }

    @GetMapping("find-all")
    @ResponseBody
    public List<Carrinho> findAll() {
        return carrinhoService.findAll();
    }

    @GetMapping("list/{user}")
    @ResponseBody
    public List<Carrinho> findCarrinhoByCliente(@PathVariable("user") String user) {
        return carrinhoService.findByClienteUsernameEquals(user);
    }

    @GetMapping("{id}")
    @ResponseBody
    public Carrinho findCarrinhoById(@PathVariable("id") Long idCarrinho) {
        return carrinhoService.findOne(idCarrinho);
    }

    @GetMapping("update-situacao/{id}/{situacao}")
    @ResponseBody
    public ResponseEntity updateSituacao(@PathVariable("id") Long id,
                                         @PathVariable("situacao") String situacao) {
        try {
            carrinhoService.updateSituacao(id, Situacao.valueOf(situacao));
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.ok(HttpStatus.BAD_REQUEST);
        }
    }

    // métodos report

    @GetMapping("comprovante/visualizar/{id}")
    public void comprovanteVisualizarReport(HttpServletResponse response,
                                            @PathVariable("id") Long id) throws JRException, SQLException, IOException {
        JasperPrint jasperPrint = carrinhoReport.generateReport(
                "classpath:/report/comprovante.jrxml", id);
        visualiar(jasperPrint, response);
    }

    private void visualiar(JasperPrint jasperPrint,
                           HttpServletResponse response) throws IOException, JRException {
        response.setContentType("application/pdf");
        OutputStream out = response.getOutputStream();
        JasperExportManager.exportReportToPdfStream(jasperPrint, out);
    }

    @GetMapping("comprovante/download/{id}")
    public void comprovanteDownloadReport(HttpServletResponse response,
                                          @PathVariable("id") Long id) throws JRException, SQLException, IOException {
        JasperPrint jasperPrint = carrinhoReport.generateReport(
                "classpath:/report/comprovante.jrxml", id);
        download(jasperPrint, response);
    }

    private void download(JasperPrint jasperPrint,
                          HttpServletResponse response)
            throws IOException, JRException {

        response.setContentType("application/x-download");
        response.setHeader("Content-Disposition",
                String.format("attachment;filename=\"comprovante.pdf\""));
        OutputStream out = response.getOutputStream();
        JasperExportManager.exportReportToPdfStream(
                jasperPrint, out);

    }

}
