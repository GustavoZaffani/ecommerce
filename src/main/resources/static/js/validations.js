function validaLogin(resetCar) {
    $('#formLogin').validate({
        rules: {
            usuarioLogin: {
                required: true
            },
            senhaLogin: {
                required: true
            }
        },
        messages: {
            usuarioLogin: {
                required: "Campo de preenchimento obrigatório!"
            },
            senhaLogin: {
                required: "Campo de preenchimento obrigatório!"
            }
        },
        submitHandler: function(form) {
            let usuario = $('#usuarioLogin').val();
            let senha = $('#senhaLogin').val();
            findUsuarioByUsuarioESenha(usuario, senha, resetCar);
        }
    });
}

function validaLoginFinally() {
    $('#formLoginFinaliza').validate({
        rules: {
            usuarioLoginFinaliza: {
                required: true
            },
            senhaLoginFinaliza: {
                required: true
            }
        },
        messages: {
            usuarioLoginFinaliza: {
                required: "Campo de preenchimento obrigatório!"
            },
            senhaLoginFinaliza: {
                required: "Campo de preenchimento obrigatório!"
            }
        },
        submitHandler: function(form) {
            let usuario = $('#usuarioLoginFinaliza').val();
            let senha = $('#senhaLoginFinaliza').val();
            findUsuarioByUsuarioESenha(usuario, senha, false);
        }
    });
}

function validaDadosCliente() {
    $('#formConfirmaDados').validate({
        rules:{
            confNome: {
                required: true
            },
            confRua: {
                required: true
            },
            confCep: {
                required: true,
                cep: true
            },
            confBairro: {
                required: true
            },
            confNro: {
                required: true
            },
            confCidade: {
                required: true
            }
        },
        messages: {
            confNome: {
                required: "Preenchimento obrigatório!"
            },
            confRua: {
                required: "Preenchimento obrigatório!"
            },
            confCep: {
                required: "Preenchimento obrigatório!",
                cep: "Informe um cep válido!"
            },
            confBairro: {
                required: "Preenchimento obrigatório!"
            },
            confNro: {
                required: "Preenchimento obrigatório!"
            },
            confCidade: {
                required: "Preenchimento obrigatório!"
            }
        },
        submitHandler: function (form) {
            dadosClienteIsOk = true;
            step('#dadosCompra');
        }
    });
}

function validaNewEndereco() {
    $('#formNewEndereco').validate({
        rules:{
            cadNewEndRua: {
                required: true
            },
            cadNewEndBairro: {
                required: true
            },
            cadNewEndNro: {
                required: true
            },
            cadNewEndCep: {
                required: true,
                cep: true
            },
            cadNewEndCidade: {
                required: true
            },
            cadNewEndApelido: {
                required: true
            }
        },
        messages: {
            cadNewEndRua: {
                required: "Preenchimento obrigatório!"
            },
            cadNewEndCep: {
                required: "Preenchimento obrigatório!",
                cep: "Informe um cep válido!"
            },
            cadNewEndBairro: {
                required: "Preenchimento obrigatório!"
            },
            cadNewEndNro: {
                required: "Preenchimento obrigatório!"
            },
            cadNewEndCidade: {
                required: "Preenchimento obrigatório!"
            },
            cadNewEndApelido: {
                required: "Preenchimento obrigatório!"
            }
        },
        submitHandler: function (form) {
            saveEndereco();
        }
    });
}

function validaUsuario() {
    $("#formCadUsuario").validate({
        rules: {
            cadNome: {
                required: true
            },
            cadDtNasc: {
                required: true
            },
            cadCpf: {
                required: true,
                cpf: true
            },
            cadTelCel: {
                required: true,
                telCel: true
            },
            cadTelRel: {
                telRes: true
            },
            cadUsuario: {
                required: true
            },
            cadSenha: {
                required: true,

            },
            cadSenhaConfirm: {
                required: true,
                equalTo: "#cadSenha"
            },
            cadEndRua: {
                required: true
            },
            cadEndBairro: {
                required: true
            },
            cadEndNro: {
                required: true
            },
            cadEndCep: {
                required: true,
                cep: true
            },
            cadEndCidade: {
                required: true
            }
        },
        messages: {
            cadNome: {
                required: "Preenchimento obrigatório!"
            },
            cadDtNasc: {
                required: "Preenchimento obrigatório!"
            },
            cadCpf: {
                required: "Preenchimento obrigatório!"
            },
            cadTelCel: {
                required: "Preenchimento obrigatório!"
            },
            cadUsuario: {
                required: "Preenchimento obrigatório!"
                // minLength: "Usuário deve conter no mínimo 5 caracteres"
            },
            cadSenha: {
                required: "Preenchimento obrigatório!"
                // minLength: "A senha deve conter no mínimo 6 caracteres"
            },
            cadSenhaConfirm: {
                required: "Preenchimento obrigatório!",
                equalTo: "A senha não corresponde com a que foi informada!"
            },
            cadEndRua: {
                required: "Preenchimento obrigatório!"
            },
            cadEndBairro: {
                required: "Preenchimento obrigatório!"
            },
            cadEndNro: {
                required: "Preenchimento obrigatório!"
            },
            cadEndCep: {
                required: "Preenchimento obrigatório!"
            },
            cadEndCidade: {
                required: "Preenchimento obrigatório!"
            }
        },
        submitHandler: function (form) {
            saveUsuario();
        }
    });
}



$.validator.addMethod("cpf", function(value, element) {
    return this.optional(element) || /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value);
}, "Informe um CPF válido!");

$.validator.addMethod("telRes", function(value, element) {
    return this.optional(element) || /^\(\d{2}\)\s*\d{4}-\d{4}$/.test(value);
}, "Informe um Telefone Res. válido!");

$.validator.addMethod("telCel", function(value, element) {
    return this.optional(element) || /^\(\d{2}\)\s*\d{4,5}-\d{4}$/.test(value);
}, "Informe um Telefone Cel. válido!");

$.validator.addMethod("cep", function(value, element) {
    return this.optional(element) || /^[0-9]{5}-[0-9]{3}$/.test(value);
}, "Informe um CEF válido!");

function validaSimulaCep(cep) {
    return /^[0-9]{5}-[0-9]{3}$/.test(cep);
}