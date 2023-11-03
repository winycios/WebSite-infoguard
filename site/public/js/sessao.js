// sessão
function validarSessao() {
    var cpf = sessionStorage.CPF_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var org = sessionStorage.CNPJ_ORGANIZACAO;
    var cargoUser = sessionStorage.CARGO_USUARIO;

    var cargo = document.getElementById("cargo");
    var b_usuario = document.getElementById("b_usuario");

    if (cpf != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../../login-cadastro/Login.html";
    }

    if (cargoUser != "Gerente") {
        cargo.style.display = "none";
    }
}

function validarTelaInicial() {
    var cpf = sessionStorage.CPF_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var org = sessionStorage.NOME_ORGANIZACAO;
    var cargoUser = sessionStorage.CARGO_USUARIO;

    var b_usuario = document.getElementById("b_usuario");
    var b_org = document.getElementById("b_org");
    var cargo = document.getElementById("cargo");

    if (cpf != null) {
        b_usuario.innerHTML = nome;
        b_org.innerHTML = org;

    } else {
        window.location = "../login-cadastro/Login.html";
    }

    if (cargoUser != "Gerente") {
        cargo.style.display = "none";
    }
}


function limparSessao() {
    sessionStorage.clear();
    window.location = "../login-cadastro/Login.html";
}

function limparSessaoTelas() {
    sessionStorage.clear();
    window.location = "../../login-cadastro/Login.html";
}
