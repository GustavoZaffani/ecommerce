var produto;

$(function () {
   loadProdutos();
   loadAvaliacoes();
});

function loadProdutos() {
    findAllJogosPs4(function (retorno) {
        montaJogos(retorno, "#gamePs");
    });
    findAllJogosXbox(function (retorno) {
        montaJogos(retorno, "#gameXbox");
    });
    findAllJogosNintendo(function (retorno) {
        montaJogos(retorno, "#gameNintendo");
    });
}

function findAllJogosPs4(callbackRetorno) {
    var produtosPs4 = new Array();
    $.ajax({
        url: 'http://localhost:8025/produto/venda',
        contentType: 'application/json',
        type: 'GET',
        data: {'tipo': 'P'},
        dataType: 'json',
        success: function (produtos) {
            if (produtos != null) {
                produtos.forEach((product) => {
                    produto = buildProduto(product);
                    produtosPs4.push(produto);
                });
                callbackRetorno(produtosPs4);
            }
        }
    });
}

function findAllJogosXbox(callbackRetorno) {
    var produtoXbox = new Array();
    $.ajax({
        url: 'http://localhost:8025/produto/venda',
        contentType: 'application/json',
        type: 'GET',
        data: {'tipo': 'X'},
        dataType: 'json',
        success: function (produtos) {
            if (produtos != null) {
                produtos.forEach((product) => {
                    produto = buildProduto(product);
                    produtoXbox.push(produto);
                });
                callbackRetorno(produtoXbox);
            }
        }
    });
}

function carrossel() {
    $('.jogos').slick({
        dots: true,
        speed: 600,
        autoplaySpeed: 2500,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true
                }
            },
            {
                breakpoint: 760,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    });
}

function findAllJogosNintendo(callbackRetorno) {
    var produtoNintendo  = new Array();
    $.ajax({
        url: 'http://localhost:8025/produto/venda',
        contentType: 'application/json',
        type: 'GET',
        data: {'tipo': 'N'},
        dataType: 'json',
        success: function (produtos) {
            if (produtos != null) {
                produtos.forEach((product) => {
                    produto = buildProduto(product);
                    produtoNintendo.push(produto);
                });
                callbackRetorno(produtoNintendo);
            }
            carrossel();
        }
    });
}

function montaJogos(produtos, idAppend) {
    produtos.forEach((produto) => {
        $(idAppend).append(`
            <div class="card card-jogo">
                <div class="card-body-jogos">
                    <img src="${produto.caminhoCapa}" alt="Capa ${produto.nome}" title="${produto.nome}" class="capa-jogo"/>
                    <h6 class="jogo-nome">${produto.nome}</h6>
                    <p> R$ ${produto.precoVenda}</p>
                    <p class="txt-parcelas">em até ${produto.qtdeParcelas} x de R$ ${calculaParcelas(produto.precoVenda, produto.qtdeParcelas)} sem juros</p>
                    <p class="jogo-details-avista"> À vista ${produto.descAVista} % de desconto R$ ${calculaPrecoAvista(produto.precoVenda, produto.descAVista)}</p>                    
                </div>
                <div>
                    <button class="btn btn-amber btn-jogos"
                            type="button"
                            onclick="inserirCarrinho(${produto.id},'` + produto.tipo + `', false)">
                            Comprar
                    </button>
                </div>
            </div>
        `);
    });
}

function calculaParcelas(preco, qtdeParcela) {
    let precoReturn = (preco / qtdeParcela);
    return formataMoeda(precoReturn);
}

function calculaPrecoAvista(preco, descontoAvista) {
    let precoReturn = (preco - (preco * (descontoAvista / 100)));
    return formataMoeda(precoReturn);
}

function formataMoeda(valor) {
    let valorReturn = Number(valor);
    valorReturn = valorReturn.toFixed(2);
    valorReturn = valorReturn.replace('.', ',');
    return valorReturn;
}

function buildProduto(produto) {
    produto = new Produto(
        produto.id,
        produto.nome,
        produto.precoVenda,
        produto.caminhoCapa,
        produto.qtdeParcelas,
        produto.descAVista,
        produto.tipo);
    return produto;
}


function loadAvaliacoes() {
    var avaliacoes = new Array();
    $.getJSON('avaliacoes.json', (data) => {
        data.avaliacoes.forEach((avaliacao) => {
            avaliacao = new Avaliacao(
                avaliacao.id,
                avaliacao.nome,
                avaliacao.avaliacao,
                avaliacao.foto);
            avaliacoes.push(avaliacao);
        });
        montaAvaliacoes(avaliacoes);
    });
}

function montaAvaliacoes(avaliacoes) {
    avaliacoes.forEach((avaliacao) => {
        $('#avaliacoes').append(`
            <div class="card card-avaliacoes d-flex">
    
                <div class="mx-auto white space-img">
                    <img src="${avaliacao.foto}" class="img-avaliacao" alt="${avaliacao.nome} title="${avaliacao.nome}"/>
                </div>
    
                <div class="space-details">
                    <h4 class="card-title text-center my-3">${avaliacao.nome}</h4>
                    <hr>
                    <p class="text-center my-5 mx-3"><i class="fas fa-quote-left"></i>${avaliacao.avaliacao}</p>
                </div>
            </div>
        `);
    });
}