package br.edu.utfpr.projeto.parte2.commerce.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Table(name = "carrinho_item")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class CarrinhoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_produto", referencedColumnName = "id")
    private Produto produto;

    @Column(name = "qtde", nullable = false)
    private Integer qtde;

    @Column(name = "valor", nullable = false)
    private BigDecimal valor;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "carrinho_id", referencedColumnName = "id")
    private Carrinho carrinho;
}
