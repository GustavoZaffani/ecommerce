var vlrTotalCarrinho;
var vlrFixedCarrinho;
var dadosClienteIsOk = false;
var dadosConfirmacaoIsOk = false;
var dadosCompraIsOk = false;

$(function () {
    buildItensCarrinho();
    montaListaJogos();
    initStep();
    initMasks();
    montaCardCarrinho();
    validaDadosCliente();
    updateQtdeItensCar();
    dadosCadastro();
});

function initStep() {
    $('#dadosCliente').show();
    $('#dadosCompra').hide();
    $('#dadosConfirmacao').hide();
    $('#dadosFinais').hide();
}

function desmontaTableListProdutos() {
    $('tr#listProdutosConfirm').remove();
}

function desmontaListaJogos() {
    $('li#itemListCarrinho').remove();
}

function desmontaListaJogosFinaliza() {
    $('ul#listaJogosFinalizaCarrinho').remove();
    $('div#detailsJogosFinalizaCarrinho').remove();
    $('div#freteChooser').remove();
}

function buildItensCarrinho() {
    if (hasProdutoCar()) {
        $('#msgCarEmpty').hide();
        $('#listaJogosCarrinho').show();
        $('#btnFinalizaCar').attr('disabled', false);
        $('#btnExcluirCar').attr('disabled', false);
    } else {
        $('#listaJogosCarrinho').hide();
        $('#msgCarEmpty').show();
        $('#btnFinalizaCar').attr('disabled', true);
        $('#btnExcluirCar').attr('disabled', true);
    }
}


function montaTableConfirmacaoProduto() {
    desmontaTableListProdutos();
    getCarrinhoSession(function () {
        carrinhoItemList.forEach((item) => {
            $('#dadosConfirmacaoProduto').append(`
                <tr id="listProdutosConfirm">
                    <td>${item.produto.nome}</td>
                    <td class="text-center">${item.qtde}</td>
                    <td class="text-center">R$ ${formataMoeda(item.produto.precoVenda)}</td>
                    <td class="text-center">R$ ${formataMoeda(item.produto.precoVenda * item.qtde)}</td>
                </tr>
            `);
        });
    });
}

function montaListaJogosFinalizaCarrinho() {
    desmontaListaJogosFinaliza();
    vlrTotalCarrinho = 0;
    getCarrinhoSession(function () {
        carrinhoItemList.forEach((itemFinalizaCarrinho) => {
            $('#dadosPrincipais').append(`
                <ul class="list-group list-group-flush" id="listaJogosFinalizaCarrinho">
                    <li id="itemListFinalizaCarrinho" class="p-2 list-group-item list-group-flush d-flex align-items-center flex-row justify-content-between bg-transparent">
                        <img class="img-card-view" src="../img/capas/capa${itemFinalizaCarrinho.produto.id}.jpg" alt="${itemFinalizaCarrinho.produto.nome}"/>
                        <span class="w-50">${itemFinalizaCarrinho.produto.nome}</span>
                        <span class="w-10">${itemFinalizaCarrinho.qtde}</span>
                        <span class="w-15">R$ ${formataMoeda(itemFinalizaCarrinho.produto.precoVenda)}</span>
                        <span class="w-15">R$ ${formataMoeda(itemFinalizaCarrinho.produto.precoVenda * itemFinalizaCarrinho.qtde)}</span>
                    </li>
                </ul>
            `);
            vlrTotalCarrinho = vlrTotalCarrinho + (itemFinalizaCarrinho.produto.precoVenda * itemFinalizaCarrinho.qtde);
        });

        vlrFixedCarrinho = vlrTotalCarrinho;
        opcoesFrete();

        $('#dadosFinaisCompra').append(`
            <div id="detailsJogosFinalizaCarrinho">
                <p id="valorTotal" class="text-right font-weight-bolder">Valor total: R$ ${formataMoeda(vlrTotalCarrinho)}</p>
                <hr>
                <div class="d-flex justify-content-center">
                    <button type="button"
                            class="btn btn-primary"
                            onclick="confirmarDadosCompra()">
                        Continuar    
                    </button>       
                </div>
            </div>  
        `);
    });
}

function confirmarDadosGerais() {
    $.get('http://localhost:18025/session/dados-session', function (carrinho) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:18025/carrinho',
            data: JSON.stringify(carrinho),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                // deletarCarrinho();
                dadosConfirmacaoIsOk = true;
                step('#dadosFinais');
            }, error: function (data) {
                console.log(data);
                swal(
                    'Atenção!',
                    'Ocorreu um erro ao finalizar o registro. Por favor, tente novamente!',
                    'error'
                );
            }
        });
    });

}

function confirmarDadosCompra() {
    setFrete(Number($("input[name='cadFrete']:checked").val()));
    dadosCompraIsOk = true;
    step('#dadosConfirmacao');
}

function confirmaDadosCliente() {
    setEnderecoCarrinho(Number($("input[name='principal']:checked").val()));
    dadosClienteIsOk = true;
    step('#dadosCompra');
}

function montaListaJogos() {
    desmontaListaJogos();
    $.get('http://localhost:18025/session', function (carrinhoList) {
        if (carrinhoList != null) {
            carrinhoItemList = carrinhoList;
            carrinhoList.forEach((itemCarrinho) => {
                $('#listaJogosCarrinho').append(`
                    <li id="itemListCarrinho" class="p-2 list-group-item d-flex align-items-center justify-content-between">
                        <img class="img-card-view" src="../img/capas/capa${itemCarrinho.produto.id}.jpg" alt="Capa ${itemCarrinho.produto.nome}"/>
                        <span class="w-30"">${itemCarrinho.produto.nome}</span>
                        <span class="w-15">R$ ${formataMoeda(itemCarrinho.produto.precoVenda * itemCarrinho.qtde)}</span>
                        <div class="d-flex justify-content-around align-items-center w-30">
                            <div class="d-flex align-items-center">
                                <i onclick="upDownQtdeCarrinhoItem(true, ${itemCarrinho.produto.id})" 
                                    class="fa fa-2x fa-arrow-circle-o-up pointer" title="Aumentar"></i>
                                <span class="px-2">${itemCarrinho.qtde}</span>
                                <i onclick="upDownQtdeCarrinhoItem(false, ${itemCarrinho.produto.id}, '` + itemCarrinho.produto.tipo + `')" 
                                    class="fa fa-2x fa-arrow-circle-o-down pointer" title="Diminuir"></i>                    
                            </div>
                            <i onclick="deleteProdutoCar(${itemCarrinho.produto.id})" 
                                class="fa fa-2x fa-trash-o pointer" title="Remover"></i>
                        </div>
                    </li>    
                `);
            });
            buildItensCarrinho();
        }
    });
}

function upDownQtdeCarrinhoItem(aumenta, id) {
    var qtde;
    aumenta == true ? qtde = 1 : qtde = -1;

    $.ajax({
        type: 'GET',
        url: `session/add/${id}/${qtde}`,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            montaListaJogos();
            montaCardCarrinho();
            updateQtdeItensCar();
        }, error: function (data) {
            console.log(data);
            swal(
                'Atenção!',
                'Ocorreu um erro ao salvar o registro. Por favor, tente novamente!',
                'error'
            );
        }
    });
}

function setFrete(valor) {
    $.get(`http://localhost:18025/session/add-frete/${valor}`, function () {
        if (vlrTotalCarrinho != vlrFixedCarrinho) {
            vlrTotalCarrinho = vlrFixedCarrinho;
        }
        vlrTotalCarrinho = vlrTotalCarrinho + valor;

        $('#valorTotal').text("Valor total: R$ " + formataMoeda(vlrTotalCarrinho));
    });
}

function opcoesFrete() {
    getFreteList(vlrTotalCarrinho);
    var hasCheked = false;
    fretes.forEach((frete) =>{
        if (frete.valor == 0) {
            $('#dadosFretes').append(`
                <div id="freteChooser" class="custom-control custom-radio py-1">
                    <input type="radio"
                           class="custom-control-input"
                           id="cad${frete.descricao}"
                           value="${frete.valor}"
                           checked
                           onclick="setFrete(${frete.valor})"
                           name="cadFrete">
                    <label class="custom-control-label"
                           for="cad${frete.descricao}">${frete.descricao} | Frete Grátis | ${frete.dias} dias úteis</label>
                 </div>
            `);
        } else if (frete.valor != 0 && !hasCheked){
            $('#dadosFretes').append(`
                <div id="freteChooser" class="custom-control custom-radio py-1">
                    <input type="radio"
                           class="custom-control-input"
                           id="cad${frete.descricao}"
                           checked
                           value="${frete.valor}"
                           onclick="setFrete(${frete.valor})"
                           name="cadFrete">
                    <label class="custom-control-label"
                           for="cad${frete.descricao}">${frete.descricao} | R$ ${formataMoeda(frete.valor)} | ${frete.dias} dias úteis</label>
                 </div>
            `);
            setFrete(frete.valor);
        } else {
            $('#dadosFretes').append(`
                <div id="freteChooser" class="custom-control custom-radio py-1">
                    <input type="radio"
                           class="custom-control-input"
                           id="cad${frete.descricao}"
                           value="${frete.valor}"
                           onclick="setFrete(${frete.valor})"
                           name="cadFrete">
                    <label class="custom-control-label"
                           for="cad${frete.descricao}">${frete.descricao} | R$ ${formataMoeda(frete.valor)} | ${frete.dias} dias úteis</label>
                 </div>
            `);
        }
        hasCheked = true;
    });
}

function finalizaCarrinho() {
    validaLoginFinally();
    $('#modalFinalizaCarrinho').modal();
}

function loadDadosConfirmacao() {
    $.get(`http://localhost:18025/session/endereco/${$('#usuario').text()}`, function (endereco) {
        $('#dadosConfBairro').text(`Bairro: ${endereco.bairro}`);
        $('#dadosConfCidade').text(`Cidade: ${endereco.cidade.nome}`);
        $('#dadosConfNro').text(`Número: ${endereco.nro}`);
        $('#dadosConfRua').text(`Endereço: ${endereco.endereco}`);
        $('#dadosConfEstado').text(`Estado: ${endereco.estado.nome}`);
        $('#dadosConfCep').text(`CEP: ${endereco.cep}`);
    });
}

function step(stepChoosed) {
    if (stepChoosed === "#dadosCliente") {
        $(stepChoosed).show();
        $('#dadosCompra').hide();
        $('#dadosConfirmacao').hide();
        $('#dadosFinais').hide();
    } else if (stepChoosed === "#dadosCompra" && dadosClienteIsOk) {
        montaListaJogosFinalizaCarrinho();
        $('#iconDadosCliente').text('');
        $('#iconDadosCliente').append('<i class="fa fa-check"></i>');
        $('#liDadosCompra').addClass('active');
        $(stepChoosed).show();
        $('#dadosCliente').hide();
        $('#dadosConfirmacao').hide();
        $('#dadosFinais').hide();
    } else if (stepChoosed === "#dadosConfirmacao" && dadosCompraIsOk) {
        loadDadosConfirmacao();
        montaTableConfirmacaoProduto();
        loadOutrasInformacoes();
        $('#iconDadosCompra').text('');
        $('#iconDadosCompra').append('<i class="fa fa-check"></i>');
        $('#liDadosConfirmacao').addClass('active');
        $(stepChoosed).show();
        $('#dadosCliente').hide();
        $('#dadosCompra').hide();
        $('#dadosFinais').hide();
    } else if (stepChoosed === '#dadosFinais' && dadosConfirmacaoIsOk) {
        $('#iconDadosConfirmacao').text('');
        $('#iconDadosConfirmacao').append('<i class="fa fa-check"></i>');
        $('#liDadosFinais').addClass('active');
        $(stepChoosed).show();
        $('#dadosCliente').hide();
        $('#dadosCompra').hide();
        $('#dadosConfirmacao').hide();
    }
}

function loadOutrasInformacoes() {
    $('#freteEscolhido').text("Frete escolhido: " + $('input[name="cadFrete"]:checked').val());
    if (localStorage.getItem('frete') == 0) {
        $('#valorFreteEscolhido').text("Valor do Frete: Grátis");
    } else {
        $.get('http://localhost:18025/session/frete', function (frete) {
            $('#valorFreteEscolhido').text("Valor do Frete: R$ " + formataMoeda(frete));
        });
    }
    $('#valorCompraSemFrete').text("Valor da Compra: R$ " + formataMoeda(vlrFixedCarrinho));
    $('#vlrFinalDaCompra').text("Total da Compra: R$ " + formataMoeda(vlrTotalCarrinho));
}

function dadosCadastro() {
    if ($('#usuario').text() == '') {
        $('#dadosCliente').append(`
            <p class="text-center">Por favor, realize o login em nossa loja, para que possamos continuar!</p>
            <p>Já possui uma conta? Clique no botão "Login" para seguir. Caso não possua, clique em "Registrar-se"</p>
            <div class="d-flex flex-center justify-content-center">
                <button class="btn btn-primary"
                        onclick="openLoginFinalizaCar()">
                    Login
                </button>
                <button class="btn btn-primary"
                        onclick="cadastrarUsuario()">
                    Registrar-se
                </button>
            </div>   
        `);
    } else {
        buildEnderecosChoose();
    }
}

function buildEnderecosChoose() {
    findEnderecos(function (callback) {
        if (callback) {
            enderecosList.forEach(endereco => {
                $('#dadosCliente').append(`
                    <div id="card-endereco" class="card my-2 card-endereco" style="width: 45% !important;">
                        <div class="card-header">
                            <div class="d-flex justify-content-between">
                                <h6 class="font-weight-bolder">${getTipoEndereco(endereco.tipoEndereco)}</h6>
                            </div>
                        </div>
                        <div class="card-body" style="height: auto;">
                            <p><strong>Rua: </strong>${endereco.endereco}</p>
                            <p><strong>Bairro: </strong>${endereco.bairro}</p>
                            <p><strong>Cidade: </strong>${endereco.cidade.nome}</p>
                            <p><strong>Estado: </strong>${endereco.estado.nome}</p>
                            <p><strong>Número: </strong>${endereco.nro}</p>
                            <div class="d-flex align-items-center custom-control custom-radio">
                                <input type="radio" name="principal" id="end${endereco.id}" 
                                       class="custom-control-input" value="${endereco.id}" 
                                       onclick="setEnderecoCarrinho(${endereco.id})" checked>
                                <label class="label-principal custom-control-label" for="end${endereco.id}">Endereço escolhido</label>
                            </div>
                        </div>
                    </div>
                  `);
            });

            $('#dadosCliente').append(`
                </div>
                <div class="d-flex justify-content-center">
                     <button type="button"
                             onclick="confirmaDadosCliente()"
                             class="btn btn-primary">
                         Continuar
                     </button>
                </div>
            `);
        }
    });
}

function setEnderecoCarrinho(idEndereco) {
    console.log(idEndereco);
    $.get(`http://localhost:18025/session/endereco/save/${idEndereco}`, function () {
        // não retorna nada, só salva
    });
}

function openLoginFinalizaCar() {
    $('#modalFinalizaCarrinho').modal('hide');
    openLogin();
}

function cadastrarUsuario() {
    $('#modalFinalizaCarrinho').modal('hide');
    validaUsuario();
    $('#modalCadastroUsuario').modal();
}

function excluirCarrinho() {
    $('#modalConfirmDelete').modal();
}

function deletarCarrinho() {
    $.get('http://localhost:18025/session/clear', function () {
        $('#modalConfirmDelete').hide();
        window.location.reload();
    });
}

function confirmaDados(event) {
    event.preventDefault();
    validaDadosCliente();
}

function finishCar() {
    dropCarrinho();
    goToHome();
}

function openScreenAddress() {
    window.location = "cliente/endereco";
}