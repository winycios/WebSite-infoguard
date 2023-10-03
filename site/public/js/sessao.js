// sessão
function validarSessao() {
    var cpf = sessionStorage.CPF_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (cpf != null && nome != null) {
        b_usuario.innerHTML = nome;
        console.log(cpf)
    } else {
        window.location = "../login-cadastro/Login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login-cadastro/Login.html";
}
