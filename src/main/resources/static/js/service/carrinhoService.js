var carrinhoItemList = new Array();

function hasProdutoCar() {
    if (carrinhoItemList != null && carrinhoItemList.length > 0) {
        return true;
    } else {
        return false;
    }
}

function deleteProdutoCar(id) {
    $.get(`session/remove/${id}`, function () {
        swal({
            title: 'Removido!',
            text: 'Produto removido com sucesso!',
            type: 'success'
        }, function () {
            window.location = '/carrinho';
        });
    });
}

function inserirCarrinho(id) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:18025/session/add/${id}/1`,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            msgSucInseridoNoCarrinho();
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

function getCarrinhoSession(callback) {
    $.get('http://localhost:18025/session', function (carrinhoList) {
        if (carrinhoList != null) {
            this.carrinhoItemList = carrinhoList;
        }
        callback();
    });
}