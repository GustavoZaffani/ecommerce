package br.edu.utfpr.projeto.parte2.commerce.model;

import br.edu.utfpr.projeto.parte2.commerce.config.LocalDateDeserializer;
import br.edu.utfpr.projeto.parte2.commerce.config.LocalDateSerializer;
import br.edu.utfpr.projeto.parte2.commerce.enumeration.Situacao;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
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
    @JsonManagedReference
    private List<CarrinhoItem> carrinhoItemList;

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    @Column(name = "dt_venda", nullable = false)
    private LocalDate dtVenda;

    @ManyToOne
    @JoinColumn(name = "id_endereco_entrega", referencedColumnName = "id")
    private Endereco enderecoEntrega;

    @Column(name = "taxa_frete", nullable = false)
    private BigDecimal taxaFrete;

    @Column(name = "situacoa", nullable = false)
    private Situacao situacao;
}
