var id;
var produto;
var precoParcela;

$(function () {
    id = getIdUrl();
    findProdutoById(Number(id), function (produtoData) {
        produto = produtoData;
        buildProdutoInterno();
        buildProdutosRelacionados(produto.tipo);
        montaParcelas();
    });
    updateQtdeItensCar();
});

function montaParcelas() {
    for (let i = 1; i <= 12; i++) {
        if (i <= produto.qtdeParcelas) {
            $('#parcelas').append('<li class="list-group-item text-center">'+ i +'x de R$ '+
                calculaParcela(produto.precoVenda, i, false) +' sem juros</li>');
        } else {
            $('#parcelas').append('<li class="list-group-item text-center">'+ i +'x de R$ '+
                calculaParcela(produto.precoVenda, i, true) +' com juros (1,99%)</li>');
        }
    }
}

function calculaParcela(vlrProduto, qtdeParcelas, hasJuros) {
    if (!hasJuros) {
        precoParcela = (vlrProduto / qtdeParcelas).toFixed(2);
    } else {
        precoParcela = ((vlrProduto / qtdeParcelas) + ((vlrProduto / qtdeParcelas) * (1.99 / 100))).toFixed(2);
    }
    precoParcela = precoParcela.replace('.', ',');
    return precoParcela;
}

function buildProdutosRelacionados(tipo) {
    if (tipo === 'P') {
        findAllJogosPs4((result) => {
            montaJogos(result, '#jogosRel');
            carrossel();
        });
    } else if (tipo === 'X') {
        findAllJogosXbox((result) => {
            montaJogos(result, '#jogosRel');
            carrossel();
        })
    } else if (tipo === 'N') {
        findAllJogosNintendo((result) => {
            montaJogos(result, '#jogosRel');
            carrossel();
        });
    }
}

function buildProdutoInterno() {
    $('#div-img-principal').append(`
        <img class="h-90 max-width-90" src="${produto.imgCapa}" alt="${produto.nome}" id="img-principal">
    `);
    $('#div-img-complementares').append(`
<!--        <img src="images/capasCompl/imgJogo1.jpg" alt="" class="pointer img-secondary" onclick="trocarImagem(event)">-->
<!--        <img src="images/capasCompl/imgJogo2.jpg" alt="" class="pointer img-secondary" onclick="trocarImagem(event)">-->
<!--        <img src="images/capasCompl/imgJogo3.jpg" alt="" class="pointer img-secondary" onclick="trocarImagem(event)">-->
<!--        <img src="images/capasCompl/imgJogo4.jpg" alt="" class="pointer img-secondary" onclick="trocarImagem(event)">-->
<!--        <img src="images/capasCompl/imgJogo5.png" alt="" class="pointer img-secondary" onclick="trocarImagem(event)">-->
    `);
    $('#nomeJogo').text(produto.nome);
    $('#codJogo').text('Código: ' + produto.id);
    $('#precoJogo').text('por: R$ ' + produto.precoVenda);
    $('#qtdeParcelasJogo').text('em até ' + produto.qtdeParcelas + 'X de R$ ' +
        calculaParcelas(produto.precoVenda, produto.qtdeParcelas) + ' sem juros.');
    $('#precoAvista').text('ou R$ ' + calculaPrecoAvista(produto.precoVenda, produto.descAVista)
        + ' via Boleto Bancário');
}

function goToCart() {
    inserirCarrinho(id);
    setTimeout(function () {
        window.location = "/carrinho";
    }, 1500);
}
