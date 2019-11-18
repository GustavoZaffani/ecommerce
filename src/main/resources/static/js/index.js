var produto;

$(function () {
   loadProdutos();
   listenerDropDown();
   loadAvaliacoes();
   updateQtdeItensCar();
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
        setTimeout(function () {
            carrossel();
        }, 500);
    });
}

function listenerDropDown() {
    $('#dropDownPs4').click(function () {
        $('html, body').animate({
            scrollTop: $('#jogosPs4').offset().top
        }, 1500);
    });

    $('#dropDownXbox').click(function () {
        $('html, body').animate({
            scrollTop: $('#jogosXbox').offset().top
        }, 1500);
    });

    $('#dropDownNintendo').click(function () {
        $('html, body').animate({
            scrollTop: $('#jogosNintendo').offset().top
        }, 1500);
    });
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