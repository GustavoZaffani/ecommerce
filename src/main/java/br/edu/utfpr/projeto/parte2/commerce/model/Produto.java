package br.edu.utfpr.projeto.parte2.commerce.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotEmpty(message = "O campo 'Nome' é de preenchimento obrigatório.")
    @Column(name = "nome", length = 50, nullable = false)
    private String nome;

    @DecimalMin(value = "0.01", message = "O valor deve ser maior que R$ 0.00.")
    @Column(name = "preco_custo", nullable = false)
    private BigDecimal precoCusto;

    @DecimalMin(value = "0.01", message = "O valor deve ser maior que R$ 0.00.")
    @Column(name = "preco_venda", nullable = false)
    private BigDecimal precoVenda;

    @NotNull(message = "O campo 'Marca' deve ser selecionado.")
    @ManyToOne
    @JoinColumn(name = "marca_id", referencedColumnName = "id")
    private Marca marca;

    @NotNull(message = "O campo 'Categoria' deve ser selecionado.")
    @ManyToOne
    @JoinColumn(name = "categoria_id", referencedColumnName = "id")
    private Categoria categoria;

    @NotEmpty(message = "O campo 'Tipo' é de preenchimento obrigatório.")
    @Column(name = "tipo", nullable = false)
    private String tipo;

    @NotNull(message = "O campo 'Desconto a Vista' é de preenchimento obrigatório.")
    @Column(name = "desc_a_vista", nullable = false)
    private BigDecimal descAVista;

    @NotNull(message = "O campo 'Qtde de Parcelas' é de preenchimento obrigatório.")
    @Column(name = "qtde_parcelas", nullable = false)
    private Integer qtdeParcelas;

}