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


//Funções da tela de usuario

// meotodo delete
function excluirUser(cpf) {
    var query = `delete from tbUsuario where cpf = ${cpf};`;

    return database.executar(query);
}


// meotodo put
// Atualizar cargo do funcionario
function updateUser(cpf, nome, telefone, senha){

    var query = `update tbUsuario set nome = '${nome}', telefone = '${telefone}', senha = '${senha}' where cpf = ${cpf};`;

    return database.executar(query);
}

// meotodo get
function plotar_dados(cpf) {
    if (cpf == 'undefined') {
        return 0;
    } else {
        console.log('select dos dados');
        var instrucao = `
        select u.nome, o.nome as 'org', cargo, cpf, telefone, senha from tbUsuario u
        INNER JOIN tbOrganizacao o ON u.fk_organizacao = cnpj
        WHERE cpf = ${cpf};
            `;

        console.log('Executando a instrução SQL: \n' + instrucao);
        return database.executar(instrucao);
    }
}


function plotar_gerente(cnpj) {
    if (cnpj == 'undefined') {
        return 0;
    } else {
        console.log('select dos gerentes');
        var instrucao = `
        select nome, telefone, statusServico from tbUsuario
        WHERE fk_organizacao = ${cnpj} AND cargo = 'Gerente';
            `;

        console.log('Executando a instrução SQL: \n' + instrucao);
        return database.executar(instrucao);
    }
}


function plotar_chamado(cpf, cnpj) {
    if (cnpj == 'undefined') {
        return 0;
    } else {
        console.log('select dos chamados');
        var instrucao = `
        select c.apelidoComputador, o.status, o.descricao, u.nome, o.hora from tbComputador c 
        INNER JOIN tbOcorrencia o ON c.idComputador = o.fk_idComputador
        LEFT JOIN tbUsuario u ON u.cpf = o.fk_cpfOperador 
        where fk_idEvento = (select idEvento from tbEvento where fk_organizacao = ${cnpj} AND status = 'Em andamento')
        AND
        o.fk_cpfOperador = ${cpf};`;

        console.log('Executando a instrução SQL: \n' + instrucao);
        return database.executar(instrucao);
    }
}

// buscar usuarios de uma organização
function buscarPorUser(cnpj) {
    if (cnpj == 'undefined') {
    } else {
        var query = `select cpf from tbUsuario where fk_organizacao = '${cnpj}'`;

        return database.executar(query);
    }
}

// buscar usuarios de uma organização que tenham resolvido chamados
function buscarPorChamados(cpf, cnpj) {
    if (cnpj == 'undefined') {
    } else {
        var query = `select o.idOcorrencia as 'contador' from tbUsuario u 
        inner Join tbOcorrencia o ON o.fk_cpfOperador = u.cpf 
        where o.fk_cpfOperador = ${cpf} AND u.fk_organizacao = ${cnpj};`;

        return database.executar(query);
    }
}


module.exports = {
    autenticar,
    cadastrar,
    renovarSenha,
    buscarPorCpf,
    plotar_chamado,
    plotar_gerente,
    plotar_dados,
    buscarPorChamados,
    buscarPorUser,
    excluirUser,
    updateUser
};