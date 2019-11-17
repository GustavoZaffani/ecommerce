package br.edu.utfpr.projeto.parte2.commerce.model;

import br.edu.utfpr.projeto.parte2.commerce.config.LocalDateDeserializer;
import br.edu.utfpr.projeto.parte2.commerce.config.LocalDateSerializer;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Data
@Table(name = "cliente")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Cliente implements Serializable, UserDetails {

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

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    @NotNull(message = "O campo 'Data de Nascimento' é de preenchimento obrigatório")
    @Column(name = "dt_nasc", nullable = false)
    private LocalDate dtNascimento;

    @Column(name = "tel_fixo")
    private String telFixo;

    @Column(name = "tel_cel")
    private String telCel;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonManagedReference
    private List<Endereco> enderecosList;

    @Column(name = "obs")
    private String observacao;

    @Column(name = "username", length = 100, nullable = false)
    private String username;

    @Column(name = "password", length = 1024, nullable = false)
    private String password;

    @ManyToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    private Set<Permissao> permissoes;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> list = new ArrayList<>();
        list.addAll(this.permissoes);
        return list;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
