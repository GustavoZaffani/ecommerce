package br.edu.utfpr.projeto.parte2.commerce.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Data
@Table(name = "cliente")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotEmpty(message = "O campo 'nome' é de preenchimento obrigatório")
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotEmpty(message = "O campo 'cpf' é de preenchimento obrigatório")
    @Column(name = "cpf", nullable = false)
    private String cpf;

    @NotNull(message = "O campo 'Data de Nascimento' é de preenchimento obrigatório")
    @Column(name = "dt_nasc", nullable = false)
    private LocalDate dtNascimento;

    @Column(name = "tel_fixo")
    private String telFixo;

    @Column(name = "tel_cel")
    private String telCel;

    private List<Endereco> enderecosList;

    @Column(name = "obs")
    private String observacao;
}
