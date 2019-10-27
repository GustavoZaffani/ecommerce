$(function () {
    createDropdownUser();
});

function createDropdownUser() {
    if (localStorage.getItem('user') === 'Visitante') {
        $('#dropdown-user').append(`
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><a onclick="openLogin()" class="color-default">Login</a></li>
                <li class="list-group-item"><a onclick="openModalCadUsuario(true)" class="color-default">Registrar-se</a></li>
            </ul>                         
        `);
    } else {
        $('#dropdown-user').append(`
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><a onclick="openForm()" class="color-default">Minha Conta</a></li>
                <li class="list-group-item"><a href="" class="color-default">Meus Pedidos</a></li>
                <li class="list-group-item text-right"><i onclick="logout()" title="Sair" class="fa fa-2x fa-sign-out pointer"></i></li>
            </ul>                        
        `);
    }
}

function openLogin() {
    $('#modalLogin').modal();
}

function openModalCadUsuario(isNew) {
    if (isNew) {
        clearFormCadUsuario();
    }
    $('#modalCadastroUsuario').modal();
    validaUsuario();
}

function openModalCadUsuario(isNew) {
    if (isNew) {
        clearFormCadUsuario();
    }
    $('#modalCadastroUsuario').modal();
    validaUsuario();
}

function clearFormCadUsuario() {
    $('#formCadUsuario')[0].reset();
}
