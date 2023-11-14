var database = require('../database/config')
var globalCnpj = null;


// cnpj da organização
function pegarCnpj(cnpj) {
    return new Promise((resolve) => {
        globalCnpj = cnpj;
        resolve(globalCnpj);
    });
}
// Atualizar cargo do funcionario
function updateUser(cpf, cargo) {

    var query = `update tbUsuario set cargo = '${cargo}' where cpf = ${cpf};`;

    return database.executar(query);
}

// buscar usuarios de uma organização
function buscarPorUser() {
    if (globalCnpj == undefined) {
    } else {
        var query = `select cpf from tbUsuario where fk_organizacao = '${globalCnpj}'`;

        return database.executar(query);
    }
}

// buscar usuarios de uma organização que tenham resolvido chamados
function buscarPorChamados(cpf) {
    if (globalCnpj == undefined) {
    } else {
        var query = `select o.idOcorrencia as 'contador' from tbUsuario u inner Join tbOcorrencia o ON o.fk_cpfOperador = u.cpf where o.fk_cpfOperador = ${cpf} AND u.fk_organizacao = ${globalCnpj};`;

        return database.executar(query);
    }
}

// exlcuir usuario
function excluirUser(cpf) {
    var query = `delete from tbUsuario where cpf = ${cpf};`;

    return database.executar(query);
}

// metodo get

/* select da equipe de suporte*/
function plotar_equipe() {
    if (globalCnpj == undefined) {
    } else {
        console.log('select da equipe de suporte');
        var instrucao = `
        select cpf,nome,telefone,cargo,statusServico from tbUsuario where fk_organizacao = ${globalCnpj};	
        `;

        console.log('Executando a instrução SQL: \n' + instrucao);
        return database.executar(instrucao);
    }
}

// plotar computadores
function plotar_computadores() {
    if (globalCnpj == undefined) {
    } else {
        console.log('select da equipe de suporte');
        var instrucao = `
        select apelidoComputador, status from tbComputador where fk_idEvento = (select idEvento from tbEvento where fk_organizacao = ${globalCnpj} AND status = 'Em andamento');
        `;

        console.log('Executando a instrução SQL: \n' + instrucao);
        return database.executar(instrucao);
    }
}

// plotar computadores
function plotar_chamado() {
    if (globalCnpj == undefined) {
    } else {
        console.log('select dos chamados');
        var instrucao = `
        select c.apelidoComputador, o.status, o.descricao, u.nome, o.hora from tbComputador c 
        INNER JOIN tbOcorrencia o ON c.idComputador = o.fk_idComputador
        LEFT JOIN tbUsuario u ON u.cpf = o.fk_cpfOperador where fk_idEvento = (select idEvento from tbEvento where fk_organizacao = ${globalCnpj} AND status = 'Em andamento');
        `;

        console.log('Executando a instrução SQL: \n' + instrucao);
        return database.executar(instrucao);
    }
}

module.exports = {

    pegarCnpj,
    plotar_computadores,
    plotar_chamado,
    buscarPorChamados,
    plotar_equipe,
    buscarPorUser,
    updateUser,
    excluirUser
};