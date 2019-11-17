var enderecosList = new Array();
var enderecoEdit = false;
var endereco;

$(function () {
    initMasks();
    validaDadosCliente();
    buildCardEnderecos();
    validaNewEndereco();
    buildCompletes();
    $('#cadNewEndCep').mask("99999-999");
    $('#titleEnderecos').hide();
    $('#msgSemEndereco').hide();
});

function validateAndSaveAddress(event) {
    event.preventDefault();
}

function buildEndereco(callback) {
    let idEstado = $('#cadNewEndEstado').val().split(" ");
    let idCidade = $('#cadNewEndCidade').val().split(" ");

    endereco = new Endereco(
        $('#cadNewEndCod').val() != '' ? $('#cadNewEndCod').val() : null,
        $('#cadNewEndRua').val(),
        $('#cadNewEndBairro').val(),
        $('#cadNewEndNro').val(),
        null,
        null,
        removeSimbolos($('#cadNewEndCep').val()),
        $('#cadNewEndTipo').val()
    );
    findObjectsEstadoAndCidade(idEstado[0], idCidade[0], function (complete) {
        if (complete) {
            callback(complete);
        }
    });
}

function findObjectsEstadoAndCidade(idEstado, idCidade, onComplete) {
    $.get(`http://localhost:8025/fornecedor/estado/${idEstado}`, function (estado) {
        endereco.estado = estado;
        $.get(`http://localhost:8025/fornecedor/cidade/${idCidade}`, function (cidade) {
            endereco.cidade = cidade;
            onComplete(true);
        });
    });
}

function saveEndereco() {
    buildEndereco(function (callback) {
        if (callback) {
            findEnderecos(function (callback) {
                if (callback) {
                    enderecosList.push(endereco);
                    save();
                }
            });
        }
    });
}

function save() {
    $.ajax({
        type: 'POST',
        url: `/cliente/endereco/save/${$('#usuario').text()}`,
        data: JSON.stringify(enderecosList),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            swal({
                title: 'Salvo!',
                text: 'Registro salvo com sucesso!',
                type: 'success'
            }, function () {
                window.location = '/cliente/endereco';
            });
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

function findEnderecos(complete) {
    enderecosList = new Array();
    $.get(`http://localhost:18025/cliente/endereco/${$('#usuario').text()}`, function (enderecos) {
        if (enderecos != null) {
            enderecos.forEach(enderecoBd => {
                let enderecoReturn = new Endereco(
                    enderecoBd.id,
                    enderecoBd.endereco,
                    enderecoBd.bairro,
                    enderecoBd.nro,
                    enderecoBd.estado,
                    enderecoBd.cidade,
                    enderecoBd.cep,
                    enderecoBd.tipoEndereco
                );
                enderecosList.push(enderecoReturn);
            });
            complete(true);
        }
    });
}

function excluir(id) {
    $.ajax({
        type: 'DELETE',
        url: `/cliente/endereco/delete/${$('#usuario').text()}/${id}`,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            swal({
                title: 'Removido!',
                text: 'Registro removido com sucesso!',
                type: 'success'
            }, function () {
                window.location = '/cliente/endereco';
            });
        }, error: function (data) {
            console.log(data);
            swal(
                'Atenção!',
                'Ocorreu um erro ao remover o registro. Por favor, tente novamente!',
                'error'
            );
        }
    });
}

function edit(id) {
    enderecoEdit = true;
    enderecosList.forEach(endereco => {
        if (endereco.id == id) {
            $('#cadNewEndCod').val(endereco.id),
            $('#cadNewEndRua').val(endereco.endereco),
            $('#cadNewEndBairro').val(endereco.bairro),
            $('#cadNewEndCep').val(endereco.cep),
            $('#cadNewEndNro').val(endereco.nro),
            $('#cadNewEndCidade').val(endereco.cidade.id),
            $('#cadNewEndTipo').val(endereco.tipoEndereco),
            $('#cadNewEndEstado').val(endereco.estado.id)
        }
    });
    findDadosOnEdit();
}

function buildCardEnderecos() {
    findEnderecos(function (callback) {
        if (callback) {
            dropListEnderecos();
            if (enderecosList != null) {
                $('#titleEnderecos').show();
                enderecosList.forEach(endereco => {
                    $('#enderecos').append(`
                        <div id="card-endereco" class="card my-2 card-endereco">
                            <div class="card-header">
                                <div class="d-flex justify-content-between">
                                    <h6 class="font-weight-bolder">${getTipoEndereco(endereco.tipoEndereco)}</h6>
                                    <div>
                                        <i class="fa fa-pencil pointer mx-2" onclick="edit(${endereco.id})"></i>
                                        <i class="fa fa-trash pointer" onclick="excluir(${endereco.id})"></i>
                                    </div>                            
                                </div>
                            </div>
                            <div class="card-body" style="height: auto;">
                                <p><strong>Rua: </strong>${endereco.endereco}</p>
                                <p><strong>Bairro: </strong>${endereco.bairro}</p>
                                <p><strong>Cidade: </strong>${endereco.cidade.nome}</p>
                                <p><strong>Estado: </strong>${endereco.estado.nome}</p>
                                <p><strong>Número: </strong>${endereco.nro}</p>
                            </div>
                        </div> 
                        `);
                });
            } else {
                $('#msgSemEndereco').show();
            }
        }
    });
}

function getTipoEndereco(tipo) {
    if (tipo === 'A') {
        return 'Endereço Alternativo';
    } else if (tipo === 'P') {
        return 'Endereço Principal';
    } else {
        return 'Endereço Cobrança';
    }

}

function dropListEnderecos() {
    $('div#card-endereco').remove();
}

function clearForm() {
    $('#formNewEndereco')[0].reset();
}

function buildCompletes() {
    $("#cadNewEndEstado").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: 'http://localhost:8025/fornecedor/estado/complete',
                type: 'GET',
                dataType: 'json',
                data: {
                    'texto': request.term
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.nome,
                            value: item.id + " - " + item.nome,
                        }
                    }));
                }
            });
        }, select(event, ui) {
            habilitaCidade();
        }
    });

    $("#cadNewEndCidade").autocomplete({
        source: function (request, response) {
            var idEstado = $('#cadNewEndEstado').val().split(" ");
            idEstado = idEstado[0];
            $.ajax({
                url: `http://localhost:8025/fornecedor/cidade/complete/${idEstado}`,
                type: 'GET',
                dataType: 'json',
                data: {
                    'texto': request.term
                }
                , success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.nome,
                            value: item.id + " - " + item.nome
                        }
                    }));
                }
            });
        }
    });
}

function findDadosOnEdit() {
    let cidade = $('#cadNewEndCidade').val();
    let estado = $('#cadNewEndEstado').val();
    if (cidade != null && cidade !== "" &&
        estado != null && estado !== "") {
        $.get(`http://localhost:8025/fornecedor/estado/${$('#cadNewEndEstado').val()}`, function (data) {
            if (data != null) {
                $('#cadNewEndEstado').val(data.id + " - " + data.nome);
            }
        });
        $.get(`http://localhost:8025/fornecedor/cidade/${$('#cadNewEndCidade').val()}`, function (data) {
            if (data != null) {
                $('#cadNewEndCidade').val(data.id + " - " + data.nome);
            }
        });
    }
}