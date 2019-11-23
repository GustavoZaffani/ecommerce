var enderecosList = new Array();

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

function getTipoEndereco(tipo) {
    if (tipo === 'A') {
        return 'Endereço Alternativo';
    } else if (tipo === 'P') {
        return 'Endereço Principal';
    } else {
        return 'Endereço Cobrança';
    }

}