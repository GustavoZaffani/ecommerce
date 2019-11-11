var cliente;
var endereco = new Array();
var endPrincipal;

function saveUsuario() {

    buildEndereco(function (callback) {
       if (callback) {
           cliente = new Cliente(
               null,
               $('#cadNome').val(),
               removeSimbolos($('#cadCpf').val()),
               $('#cadDtNasc').val(),
               removeSimbolos($('#cadTelRes').val()),
               removeSimbolos($('#cadTelCel').val()),
               $('#cadObs').val(),
               endereco,
               $('#cadUsuario').val(),
               $('#cadSenha').val()
           );
           $.ajax({
               type: 'POST',
               url: '/cliente',
               data: JSON.stringify(cliente),
               contentType: "application/json; charset=utf-8",
               success: function () {
                   swal({
                       title: 'Salvo!',
                       text: 'Registro salvo com sucesso!',
                       type: 'success'
                   }, function () {
                       window.location = '/';
                   });
               },
               error: function (data) {
                   console.log(data);
                   swal(
                       'Atenção!',
                       'Ocorreu um erro ao salvar o registro. Por favor, tente novamente!',
                       'error'
                   );
               }
           });
       }
    });
}

function buildEndereco(callback) {
    let idEstado = $('#estado').val().split(" ");
    let idCidade = $('#cidade').val().split(" ");

    endPrincipal = new Endereco(
        null,
        $('#cadEndRua').val(),
        $('#cadEndBairro').val(),
        $('#cadEndNro').val(),
        null,
        null,
        removeSimbolos($('#cadEndCep').val())
    );
    findObjectsEstadoAndCidade(idEstado[0], idCidade[0], function (complete) {
        if (complete) {
            endereco.push(endPrincipal);
            callback(complete);
        }
    });
}

function findObjectsEstadoAndCidade(idEstado, idCidade, onComplete) {
    $.get(`http://localhost:8025/fornecedor/estado/${idEstado}`, function (estado) {
        endPrincipal.estado = estado;
        $.get(`http://localhost:8025/fornecedor/cidade/${idCidade}`, function (cidade) {
            endPrincipal.cidade = cidade;
            onComplete(true);
        });
    });
}

function inserirUsuario(event) {
    event.preventDefault();
    validaUsuario();
}

function findDadosCliente(callback) {
    $.ajax({
        type: 'GET',
        url: '/cliente',
        data: {
            'user': $('#usuario').text()
        },
        success: function (data) {
            buildCliente(data, function (cliente) {
              callback(cliente);
            });
        },
        error: function (data) {
            console.log(data);
            swal(
                'Atenção!',
                'Ocorreu um erro ao buscar os dados do cliente. Por favor, tente novamente!',
                'error'
            );
        }
    });
}

function buildCliente(clienteBd, callback) {
    buildEnderecoBd(clienteBd, function (complete) {
        if (complete) {
            cliente = new Cliente(
                clienteBd.id,
                clienteBd.nome,
                clienteBd.cpf,
                clienteBd.dtNascimento,
                clienteBd.telFixo,
                clienteBd.telCel,
                clienteBd.observacao,
                endereco,
                clienteBd.username,
                null
            );
            callback(cliente);
        }
    });

}

function buildEnderecoBd(clienteBd, onComplete) {
    endPrincipal = new Endereco (
        clienteBd.enderecosList[0].id,
        clienteBd.enderecosList[0].endereco,
        clienteBd.enderecosList[0].bairro,
        clienteBd.enderecosList[0].nro,
        clienteBd.enderecosList[0].estado,
        clienteBd.enderecosList[0].cidade,
        clienteBd.enderecosList[0].cep
    );
    endereco.push(endPrincipal);
    onComplete(true);
}