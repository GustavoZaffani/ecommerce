var totalCarrinho = 0;
var exit = true;

$(function () {
    buildCompletes();
    buildCategorias();
    montaCardCarrinho();
    initMasks();
    $('html').mouseleave(function () {
        msgExit();
    });
});

function msgExit() {
    if (sessionStorage.getItem('exit') == null || sessionStorage.getItem('exit') == true) {
        sessionStorage.setItem('exit', false);
        $('#modalExit').modal();
    }
}

function buildCategorias() {
    $('div>#drop-cat').remove();
    $.get('http://localhost:8025/categoria/api/find-all', function (categorias) {
        if (categorias != null) {
            categorias.forEach(categoria => {
                $('#drop-cat').append(`
                    <a class="dropdown-item" id="dropDownXbox" onclick="findByCategoria(${categoria.id})">${categoria.descricao}</a> 
                `);
            });
        }
    });
}

function findByCategoria(idCategoria) {
    $('.jogos').slick("unslick");
    $('.card-jogo').remove();
    findAllJogosPs4ByCategoria(idCategoria, function (retorno) {
        montaJogos(retorno, "#gamePs");
    });
    findAllJogosXboxByCategoria(idCategoria, function (retorno) {
        montaJogos(retorno, "#gameXbox");
    });
    findAllJogosNintendoByCategoria(idCategoria, function (retorno) {
        montaJogos(retorno, "#gameNintendo");
        setTimeout(function () {
            carrossel();
        }, 500);
    });
}

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
            $('#cadCpf').val(cliente.cpf);
            $('#cadTelRes').val(cliente.telFixo);
            $('#cadTelCel').val(cliente.telCel);
            $('#cadUsuario').val(cliente.username);
            getEnderecoPrincipal(cliente);
            $('#cadEndObs').val(cliente.observacao);
            findDadosOnEdit();
            initMasks();
        }
        openModalCadUsuario(false);
    });
}

function getEnderecoPrincipal(cliente) {
    cliente.enderecosList.forEach(ends => {
        if (ends.id == 1) {
            $('#cadEndRua').val(ends.endereco);
            $('#cadEndBairro').val(ends.bairro);
            $('#cadEndCep').val(ends.cep);
            $('#cadEndNro').val(ends.nro);
            $('#cidade').val(ends.cidade.id);
            $('#estado').val(ends.estado.id);
        }
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