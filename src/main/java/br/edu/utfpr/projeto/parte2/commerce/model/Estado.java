package br.edu.utfpr.projeto.parte2.commerce.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "estado")
public class Estado implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome", length = 20, nullable = false)
    private String nome;

    @Column(name = "uf", length = 2, nullable = false)
    private String uf;

    @ManyToOne
    @JoinColumn(name = "pais_id", referencedColumnName = "id")
    private Pais pais;
}
