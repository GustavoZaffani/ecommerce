var cliente;
var endereco = new Array();
var endPrincipal;
var endAux;
var listAux = new Array();

function saveUsuario() {

    buildEndereco(function (callback) {
       if (callback) {
           listAux.push(endAux);
           cliente = new Cliente(
               cliente != null ? cliente.id : null,
               $('#cadNome').val(),
               removeSimbolos($('#cadCpf').val()),
               $('#cadDtNasc').val(),
               removeSimbolos($('#cadTelRes').val()),
               removeSimbolos($('#cadTelCel').val()),
               $('#cadObs').val(),
               cliente != null ? cliente.enderecosList : listAux,
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

    endAux = new Endereco(
        endPrincipal != null ? endPrincipal.id : null,
        $('#cadEndRua').val(),
        $('#cadEndBairro').val(),
        $('#cadEndNro').val(),
        null,
        null,
        removeSimbolos($('#cadEndCep').val()),
        endPrincipal != null ? endPrincipal.tipoEndereco : null
    );

    if (cliente != null) {
        cliente.enderecosList.forEach((end, index) => {
            if (end.id == endPrincipal.id) {
                cliente.enderecosList.splice(index, 1);

            }
        });
    }

    findObjectsEstadoAndCidade(idEstado[0], idCidade[0], function (complete) {
        if (complete) {
            if (cliente != null) {
                cliente.enderecosList.push(endAux);
            }
            callback(complete);
        }
    });
}

function findObjectsEstadoAndCidade(idEstado, idCidade, onComplete) {
    $.get(`http://localhost:8025/fornecedor/estado/${idEstado}`, function (estado) {
        endAux.estado = estado;
        $.get(`http://localhost:8025/fornecedor/cidade/${idCidade}`, function (cidade) {
            endAux.cidade = cidade;
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
                clienteBd.enderecosList,
                clienteBd.username,
                null
            );
            callback(cliente);
        }
    });

}

function buildEnderecoBd(clienteBd, onComplete) {
    clienteBd.enderecosList.forEach(ends => {
        if (ends.id == 1) {
            endPrincipal = new Endereco (
                ends.id,
                ends.endereco,
                ends.bairro,
                ends.nro,
                ends.estado,
                ends.cidade,
                ends.cep,
                ends.tipoEndereco
            );
        }
    });
    onComplete(true);
}