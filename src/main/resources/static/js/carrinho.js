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
                        <img class="img-card-view" src="img/card.png" alt="${itemFinalizaCarrinho.produto.nome}"/>
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
    dadosConfirmacaoIsOk = true;
    step('#dadosFinais');
}

function confirmarDadosCompra() {
    dadosCompraIsOk = true;
    step('#dadosConfirmacao');
}

function confirmaDadosCliente() {
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
                        <img class="img-card-view" src="${itemCarrinho.produto.caminhoCapa}" alt=""/>
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
                           value="${frete.descricao}"
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
                           value="${frete.descricao}"
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
                           value="${frete.descricao}"
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
    $('#dadosConfNome').text("Nome: " + $('#confNome').val());
    $('#dadosConfBairro').text("Bairro: " + $('#confBairro').val());
    $('#dadosConfCidade').text("Cidade: " + $('#confCidade').val());
    $('#dadosConfNro').text("Número: " + $('#confNro').val());
    $('#dadosConfRua').text("Endereço: " + $('#confRua').val());
    $('#dadosConfEstado').text("Estado: " + $('#confEstado option:selected').text());
    $('#dadosConfCep').text("CEP: " + $('#confCep').val());
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
        $.get('', function (frete) {
            $('#valorFreteEscolhido').text("Valor do Frete: R$ " + formataMoeda(frete));
        });
    }
    $('#valorCompraSemFrete').text("Valor da Compra: R$ " + formataMoeda(vlrFixedCarrinho));
    $('#vlrFinalDaCompra').text("Total da Compra: R$ " + formataMoeda(vlrTotalCarrinho));
}

function dadosCadastro() {
    if ($('#usuario').text() == '') {
        $('#dadosCliente').append(`
            <p>Por favor, realize o login em nossa loja, para que possamos continuar!</p>
            <form id="formLoginFinaliza" onsubmit="login(event, false, true)">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="username">Usuário</label>
                            <input id="username"
                                   name="username"
                                   class="form-control"
                                   type="text">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="password">Senha</label>
                            <input id="password"
                                   name="password"
                                   class="form-control"
                                   type="password">
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-primary"
                            type="submit">
                        Login
                    </button>
                </div>
            </form>
            <p class="text-center py-1">Ainda não é cadastro? Clique <a class="msg-add-user" onclick="cadastrarUsuario()">aqui</a> e cadastre-se já! É rápido e fácil ;)</p>
        `);
    } else {
        buildEnderecosChoose();

        // $('#dadosCliente').append(`
        //     <div class="text-center">
        //         <span class="font-weight-bold">Confirme o endereço de entrega</span>
        //     </div>
        //     <form id="formConfirmaDados" onsubmit="confirmaDados(event)">
        //         <div class="row">
        //             <div class="col-md-12">
        //                 <div class="form-group">
        //                     <label for="confNome">Nome</label>
        //                     <input type="text"
        //                            id="confNome"
        //                            value="${usuarioLogado.nome}"
        //                            name="confNome"
        //                            class="form-control">
        //                 </div>
        //             </div>
        //         </div>
        //
        //         <div class="row">
        //             <div class="col-md-9">
        //                 <div class="form-group">
        //                     <label for="confRua">Endereço</label>
        //                     <input type="text"
        //                            id="confRua"
        //                            value="${usuarioLogado.rua}"
        //                            name="confRua"
        //                            class="form-control">
        //                 </div>
        //             </div>
        //             <div class="col-md-3">
        //                 <div class="form-group">
        //                     <label for="confCep">Cep</label>
        //                     <input type="text"
        //                            id="confCep"
        //                            value="${usuarioLogado.cep}"
        //                            name="confCep"
        //                            class="form-control">
        //                 </div>
        //             </div>
        //         </div>
        //
        //         <div class="row">
        //             <div class="col-md-9">
        //                 <div class="form-group">
        //                     <label for="confBairro">Bairro</label>
        //                     <input type="text"
        //                            id="confBairro"
        //                            value="${usuarioLogado.bairro}"
        //                            name="confBairro"
        //                            class="form-control">
        //                 </div>
        //             </div>
        //             <div class="col-md-3">
        //                 <div class="form-group">
        //                     <label for="confNro">Número</label>
        //                     <input type="number"
        //                            id="confNro"
        //                            value="${usuarioLogado.nro}"
        //                            name="confNro"
        //                            class="form-control">
        //                 </div>
        //             </div>
        //         </div>
        //
        //         <div class="row">
        //             <div class="col-md-9">
        //                 <div class="form-group">
        //                     <label for="confCidade">Cidade</label>
        //                     <input type="text"
        //                            id="confCidade"
        //                            value="${usuarioLogado.cidade}"
        //                            name="confCidade"
        //                            class="form-control">
        //                 </div>
        //             </div>
        //             <div class="col-md-3">
        //                 <div class="form-group">
        //                     <label for="confEstado">Estado</label>
        //                     <select name="confEstado" id="confEstado" class="form-control">
        //                         <option value="AC">Acre</option>
        //                         <option value="AL">Alagoas</option>
        //                         <option value="AP">Amapá</option>
        //                         <option value="AM">Amazonas</option>
        //                         <option value="BA">Bahia</option>
        //                         <option value="CE">Ceará</option>
        //                         <option value="DF">Distrito Federal</option>
        //                         <option value="ES">Espírito Santo</option>
        //                         <option value="GO">Goiás</option>
        //                         <option value="MA">Maranhão</option>
        //                         <option value="MT">Mato Grosso</option>
        //                         <option value="MS">Mato Grosso do Sul</option>
        //                         <option value="MG">Minas Gerais</option>
        //                         <option value="PA">Pará</option>
        //                         <option value="PB">Paraíba</option>
        //                         <option value="PR">Paraná</option>
        //                         <option value="PE">Pernambuco</option>
        //                         <option value="PI">Piauí</option>
        //                         <option value="RJ">Rio de Janeiro</option>
        //                         <option value="RN">Rio Grande do Norte</option>
        //                         <option value="RS">Rio Grande do Sul</option>
        //                         <option value="RO">Rondônia</option>
        //                         <option value="RR">Roraima</option>
        //                         <option value="SC">Santa Catarina</option>
        //                         <option value="SP">São Paulo</option>
        //                         <option value="SE">Sergipe</option>
        //                         <option value="TO">Tocantins</option>
        //                     </select>
        //                 </div>
        //             </div>
        //         </div>
        //
        //         <div class="d-flex justify-content-center">
        //             <button type="submit"
        //                      class="btn btn-primary">
        //                 Continuar
        //             </button>
        //         </div>
        //     </form>
        // `)
        //$('#confEstado').val(usuarioLogado.estado).change();
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
                            <div class="d-flex align-items-center">
                                <input type="radio" id="principal"><label class="label-principal" for="principal">Endereço escolhido</label>
                            </div>
                        </div>
                    </div> 
                    
                    <div class="d-flex justify-content-center">
                         <button type="button"
                                 onclick="confirmaDadosCliente()"
                                 class="btn btn-primary">
                             Continuar
                         </button>
                     </div>
                  `);
            });
        }
    });
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