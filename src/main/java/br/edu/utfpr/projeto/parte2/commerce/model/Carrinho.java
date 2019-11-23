package br.edu.utfpr.projeto.parte2.commerce.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Table(name = "carrinho")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Carrinho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id", referencedColumnName = "id")
    private Cliente cliente;

    @OneToMany(mappedBy = "carrinho",
            cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<CarrinhoItem> carrinhoItemList;

    @Column(name = "dt_venda", nullable = false)
    private LocalDate dtVenda;

    @ManyToOne
    @JoinColumn(name = "id_endereco_entrega", referencedColumnName = "id")
    private Endereco enderecoEntrega;

    @Column(name = "taxa_frete", nullable = false)
    private BigDecimal taxaFrete;

    @Column(name = "obs", nullable = false)
    private String obs;
}
