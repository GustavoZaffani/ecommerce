function findProdutoById(id, callbackRetorno) {
    $.ajax({
        url: 'http://localhost:8025/produto/api/produto',
        contentType: 'application/json',
        type: 'GET',
        data: {'id': id},
        dataType: 'json',
        success: function (produto) {
            if (produto != null) {
                let produtoBuild = buildProduto(produto);
                callbackRetorno(produtoBuild);
            }
        }
    });
}

function findAllJogosPs4(callbackRetorno) {
    var produtosPs4 = new Array();
    $.ajax({
        url: 'http://localhost:8025/produto/api/produtos/tipo',
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
        url: 'http://localhost:8025/produto/api/produtos/tipo',
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

function findAllJogosNintendo(callbackRetorno) {
    var produtoNintendo = new Array();
    $.ajax({
        url: 'http://localhost:8025/produto/api/produtos/tipo',
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
        }
    });
}