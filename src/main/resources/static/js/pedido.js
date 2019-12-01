var pedidosCliente;

$(function () {
    verificaPedidos(false);
    findPedidosByCliente();
    verificaPedidos();
});

function findPedidosByCliente() {
    pedidosCliente = new Array();
    $.get(`http://localhost:18025/carrinho/list/${$('#usuario').text()}`, function (carrinhos) {
        if (carrinhos != null) {
            pedidosCliente = carrinhos;
            $('tbody>#itemPedido').remove();
            carrinhos.forEach(carrinho => {
                $('#listaPedidos').append(`
                    <tr id="itemPedido">
                        <td class="text-center">${carrinho.id}</td>
                        <td class="text-center">${carrinho.dtVenda}</td>
                        <td class="text-center">${countQtdePedido(carrinho.carrinhoItemList)}</td>
                        <td class="text-center">R$ ${formataMoeda(calculaVlrTotalPedido(carrinho))}</td>
                        <td class="text-center">${verificaSituacao(carrinho.situacao)}</td>
                        <td class="text-center">
                            <a onclick="openModalItens(${carrinho.id})"
                                class="btn btn-primary btn-delete" title="Info" style="border-radius: 25px">
                                <i class="fas fa-info ml-2"></i>
                            </a>
                        </td>
                    </tr>
                `);
            });
            verificaPedidos(true);
        } else {
            verificaPedidos(false);
        }
    });
}

function openModalItens(idPedido) {
    buildTableItensCarrinho(idPedido);
    $('#modalItens').modal();
}

function calculaVlrTotalPedido(carrinho) {
    var vlrTotal = 0;
    carrinho.carrinhoItemList.forEach(carrinhoItem => {
        vlrTotal += (carrinhoItem.valor * carrinhoItem.qtde);
    });
    vlrTotal += carrinho.taxaFrete;
    return vlrTotal;
}

function countQtdePedido(carrinhoItemList) {
    var qtdeItem = 0;
    carrinhoItemList.forEach(carrinhoItem => {
        qtdeItem += carrinhoItem.qtde;
    });
    return qtdeItem;
}

function verificaSituacao(situacao) {
    if (situacao == 'AA') {
        return "Aguardando aprovação";
    } else if (situacao == 'PA') {
        return "Pagamento aprovado";
    } else if (situacao == 'ES') {
        return "Em separação";
    } else if (situacao == 'ET') {
        return "Enviado à transportadora";
    } else if (situacao == 'SE') {
        return "Saiu para Entrega";
    } else if (situacao == 'PE') {
        return "Pedido entrege";
    }
}

function verificaPedidos(hasPedido) {
    if (hasPedido) {
        $('#msgSemPedidos').hide();
        $('#pedidos').show();
    } else {
        $('#msgSemPedidos').show();
        $('#pedidos').hide();
    }
}

function buildTableItensCarrinho(id) {
    $('tbody>#item').remove();
    $('div>#info').remove();
    $('div>#btn-rep').remove();
    pedidosCliente.forEach(pedido => {
        if (pedido.id == id) {
            pedido.carrinhoItemList.forEach(item => {
                $('#itens').append(`
                    <tr id="item">
                        <td class="text-center">${item.produto.id}</td>
                        <td class="text-center">${item.produto.nome}</td>
                        <td class="text-center">R$ ${formataMoeda(item.valor)}</td>
                        <td class="text-center">${item.qtde}</td>
                        <td class="text-center">R$ ${formataMoeda(item.valor * item.qtde)}</td>
                    </tr>
                `);
            });
            $('#moreInfo').append(`         
                <div id="info">       
                    <h6 class="border-info-top">Endereço de entrega</h6>
                    <span>${montaEnderecoEntrega(pedido.enderecoEntrega)}</span>
                    <h6 class="border-info-top" style="margin-top: 10px">Taxa de frete</h6>
                    <span>R$ ${formataMoeda(pedido.taxaFrete)}</span>
                </div>            
            `);
            $('#btn-report').append(`
                <div id="btn-rep">
                   <i class="fa fa-eye pointer mx-2" onclick="viewComprovante(${pedido.id})" title="Visualizar Comprovante"></i>
                   <i class="fa fa-download pointer" onclick="downComprovante(${pedido.id})" title="Download Comprovante"></i>
                </div>
            `);
        }
    });
}

function montaEnderecoEntrega(endereco) {
    return endereco.endereco + ", " + endereco.nro + " - " + endereco.bairro + ", " + endereco.cidade.nome + " - " + endereco.estado.uf;
}

