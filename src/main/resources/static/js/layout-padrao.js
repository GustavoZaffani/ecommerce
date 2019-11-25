var totalCarrinho = 0;

$(function () {
    buildCompletes();
    montaCardCarrinho();
    initMasks();
});

function desmontaCardCarrinho() {
    $('li#itemCar').remove();
    totalCarrinho = 0;
}

function montaCardCarrinho() {
    $.get('http://localhost:18025/session', function (carrinhoList) {
       desmontaCardCarrinho();
       if (carrinhoList != null) {
           carrinhoList.forEach((carrinho) => {
               totalCarrinho = totalCarrinho + (carrinho.valor * carrinho.qtde);
               $('#itensCard').append(`
                    <li id="itemCar" class="p-2">
                        <img class="img-card-view" src="../img/capas/capa${carrinho.produto.id}.jpg" alt=""/>
                        <span class="abbreviate">${carrinho.produto.nome}</span>
                        <span>R$ ${formataMoeda(carrinho.valor * carrinho.qtde)}</span>
                    </li>
               `);
           });
           $('#carrinho-view-details-total').text('Total: R$ ' + formataMoeda(totalCarrinho));
       }
    });
}

function openModalCadUsuario(isNew) {
    if (isNew) {
        clearFormCadUsuario();
    }
    $('#modalCadastroUsuario').modal();
    validaUsuario();
}

function clearFormCadUsuario() {
    $('#formCadUsuario')[0].reset();
}

function initMasks() {
    $('#cadCpf').mask('999.999.999-99');
    $('#cadTelCel').mask('(99)99999-9999');
    $('#cadTelRes').mask('(99)9999-9999');
    $('#cadEndCep').mask('99999-999');
    $('#simulaCep').mask('99999-999');
    $('#confCep').mask('99999-999');
}

function openScreenPedidos() {
    window.location = "/cliente/pedidos";
}

function openForm() {
    findDadosCliente(function (cliente) {
        if (cliente != null) {
            $('#cadNome').val(cliente.nome);
            $('#cadDtNasc').val(cliente.dtNascimento);
            //$('input:radio[name="cadGenero"]').filter('[value="'+ usuarioLogado.genero +'"]').attr('checked', true);
            $('#cadCpf').val(cliente.cpf);
            $('#cadTelRes').val(cliente.telFixo);
            $('#cadTelCel').val(cliente.telCel);
            $('#cadUsuario').val(cliente.username);
            $('#cadEndRua').val(cliente.enderecosList[0].endereco);
            $('#cadEndBairro').val(cliente.enderecosList[0].bairro);
            $('#cadEndCep').val(cliente.enderecosList[0].cep);
            $('#cadEndNro').val(cliente.enderecosList[0].nro);
            $('#cidade').val(cliente.enderecosList[0].cidade.id);
            $('#estado').val(cliente.enderecosList[0].estado.id);
            $('#cadEndObs').val(cliente.observacao);
            findDadosOnEdit();
            initMasks();
        }
        openModalCadUsuario(false);
    });
}

function habilitaCidade() {
    let estado = $('#estado').val();
    if (estado != null && estado !== "") {
        $('#cidade').attr('disabled', false);
    } else {
        $('#cidade').attr('disabled', true);
    }
}

function buildCompletes() {
    $("#estado").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: 'http://localhost:8025/fornecedor/estado/complete',
                type: 'GET',
                dataType: 'json',
                data: {
                    'texto': request.term
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.nome,
                            value: item.id + " - " + item.nome,
                        }
                    }));
                }
            });
        }, select(event, ui) {
            habilitaCidade();
        }
    });

    $("#cidade").autocomplete({
        source: function (request, response) {
            var idEstado = $('#estado').val().split(" ");
            idEstado = idEstado[0];
            $.ajax({
                url: `http://localhost:8025/fornecedor/cidade/complete/${idEstado}`,
                type: 'GET',
                dataType: 'json',
                data: {
                    'texto': request.term
                }
                , success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.nome,
                            value: item.id + " - " + item.nome
                        }
                    }));
                }
            });
        }
    });
}

function findDadosOnEdit() {
    let cidade = $('#cidade').val();
    let estado = $('#estado').val();
    if (cidade != null && cidade !== "" &&
        estado != null && estado !== "") {
        $.get(`http://localhost:8025/fornecedor/estado/${$('#estado').val()}`, function (data) {
            if (data != null) {
                $('#estado').val(data.id + " - " + data.nome);
            }
        });
        $.get(`http://localhost:8025/fornecedor/cidade/${$('#cidade').val()}`, function (data) {
            if (data != null) {
                $('#cidade').val(data.id + " - " + data.nome);
            }
        });
    }
}