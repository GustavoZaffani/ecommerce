package br.edu.utfpr.projeto.parte2.commerce.model;

import br.edu.utfpr.projeto.parte2.commerce.enumeration.TipoEndereco;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@Table(name = "endereco")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@ToString(of = {"id", "endereco"})
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotEmpty(message = "O campo 'endereco' é de preenchimento obrigatório")
    @Column(name = "endereco", nullable = false)
    private String endereco;

    @Column(name = "bairro", nullable = false)
    private String bairro;

    @NotNull(message = "O campo 'Número' é de preenchimento obrigatório")
    @Column(name = "nro", nullable = false)
    private Integer nro;

    @ManyToOne
    @JoinColumn(name = "estado_id", referencedColumnName = "id")
    private Estado estado;

    @ManyToOne
    @JoinColumn(name = "cidade_id", referencedColumnName = "id")
    private Cidade cidade;

    @Column(name = "cep")
    private String cep;

    @Column(name = "tipo")
    private TipoEndereco tipoEndereco;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "cliente_id", referencedColumnName = "id")
    private Cliente cliente;
}
