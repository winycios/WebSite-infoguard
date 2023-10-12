var database = require("../database/config")


// buscar por cpf
function buscarPorCpf(cpf) {
    var query = `select * from tbUsuario where cpf = '${cpf}'`;

    return database.executar(query);
  }

  // autenticar usuario
function autenticar(cpf, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", cpf, senha)
    var instrucao = `
    SELECT cpf, fk_organizacao as 'cnpj', u.nome as 'user', o.nome as 'org',cargo FROM tbUsuario u
        inner join tbOrganizacao o ON u.fk_organizacao = o.cnpj
            WHERE cpf = '${cpf}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, senha, cpf, telefone, cargo, organizacao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cpf, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        insert into tbUsuario values ('${cpf}', '${organizacao}' , '${nome}', '${senha}', '${telefone}', '${cargo}', 'livre');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function renovarSenha(cpf, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function renovarSenha(): ", cpf, senha)
    var instrucao = `
    UPDATE tbUsuario SET senha = '${senha}' WHERE cpf = '${cpf}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrar,
    renovarSenha,
    buscarPorCpf
};