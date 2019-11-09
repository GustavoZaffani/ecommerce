package br.edu.utfpr.projeto.parte2.commerce.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@Table(name = "endereco")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
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
    @JoinColumn(name = "id_estado", referencedColumnName = "id")
    private Estado estado;

    @ManyToOne
    @JoinColumn(name = "id_cidade", referencedColumnName = "id")
    private Cidade cidade;

}
