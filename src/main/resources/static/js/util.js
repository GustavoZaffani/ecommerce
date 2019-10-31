var fretes = new Array();

function formataMoeda(valor) {
    let valorReturn = Number(valor);
    valorReturn = valorReturn.toFixed(2);
    valorReturn = valorReturn.replace('.', ',');
    return valorReturn;
}

function getIdUrl() {
    var id;
    id = window.location.pathname.slice(1);
    id = id.split("/");
    return id[1];
}

function calculaPrecoAvista(preco, descontoAvista) {
    let precoReturn = (preco - (preco * (descontoAvista / 100)));
    return formataMoeda(precoReturn);
}


function calculaParcelas(preco, qtdeParcela) {
    let precoReturn = (preco / qtdeParcela);
    return formataMoeda(precoReturn);
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

function montaTableFrete(valorProduto) {
    showElement('#loader', 'd-flex');
    clearFretes();
    if (validaSimulaCep($('#simulaCep').val())) {
        getFreteList(valorProduto);
        setTimeout(() => {
            showElement('.delimitador', 'd-block');
            $('.table').removeClass('d-none');
            hiddenElement('#loader', 'd-flex');
            fretes.forEach(function (frete) {
                if (frete.valor == 0) {
                    $('#valoresFrete').append(`
                        <tr id="linhaFrete">
                            <td>`+ frete.descricao +`</td>
                            <td>Frete Grátis</td>
                            <td>`+ frete.dias +` dias úteis</td>
                        </tr>
                    `);
                } else {
                    $('#valoresFrete').append(`
                        <tr id="linhaFrete">
                            <td>`+ frete.descricao +`</td>
                            <td> R$ `+ formataMoeda(frete.valor) +`</td>
                            <td>`+ frete.dias +` dias úteis</td>
                        </tr>
                    `);
                }
            });
        }, 1250);
    } else {
        hiddenElement('#loader', 'd-flex');
        // msgErrorCepInvalido();
    }
}

function showElement(element, displayNew) {
    $(element).removeClass('d-none');
    $(element).addClass(displayNew);
}

function clearFretes() {
    $('tr#linhaFrete').remove();
}

function validaSimulaCep(cep) {
    return /^[0-9]{5}-[0-9]{3}$/.test(cep);
}

function getFreteList(valorProduto) {
    var frete = null;
    fretes = new Array();
    if (valorProduto > 199.99) {
        frete = new Frete(
            'Convencional',
            0,
            9
        );
        fretes.push(frete);
    }
    frete = new Frete(
        'Sedex',
        calculaFrete(valorProduto, 'S'),
        5
    );
    fretes.push(frete);

    frete = new Frete(
        'PAC',
        calculaFrete(valorProduto, 'P'),
        9
    );
    fretes.push(frete);

    frete = new Frete(
        'Outros',
        calculaFrete(valorProduto, 'O'),
        10
    );
    fretes.push(frete);
}

function calculaFrete(vlrProduto, tipo) {
    if (tipo === 'S') {
        return vlrProduto * (12/100);
    } else if (tipo === 'P') {
        return vlrProduto * (8/100);
    } else if (tipo === 'O') {
        return vlrProduto * (5/100);
    }
}


function hiddenElement(element, displayOld) {
    $(element).removeClass(displayOld);
    $(element).addClass('d-none');
}
