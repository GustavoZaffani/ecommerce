function msgSucInseridoNoCarrinho() {
    $.toast({
        heading: 'Sucesso',
        text: 'O produto foi adicionado no carrinho!',
        position: 'top-right',
        icon: 'success',
        stack: false
    });
}

function msgErrorUsuarioIncorreto() {
    $.toast({
        heading: 'Atenção',
        text: 'O usuário/senha estão incorretos. Verifique e tente novamente!',
        position: 'top-right',
        icon: 'error',
        stack: false
    });
}

function msgErrorCepInvalido() {
    $.toast({
        heading: 'Atenção',
        text: 'Necessário informar um CEP válido',
        position: 'top-right',
        icon: 'error',
        stack: false
    });
}

function msgSucUsuarioCadastrado() {
    $.toast({
        heading: 'Sucesso',
        text: 'O usuário foi cadastrado com sucesso!',
        position: 'top-right',
        icon: 'success',
        stack: false
    });
}

