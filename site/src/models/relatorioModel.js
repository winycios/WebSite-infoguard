var database = require("../database/config")
var globalCnpj = null;


// cnpj da organização
function pegarCnpj(cnpj) {
    return new Promise((resolve) => {
        globalCnpj = cnpj;
        resolve(globalCnpj);
    });
}

// buscar usuarios de uma organização
function buscarPorUser() {
    if (globalCnpj == undefined) {
    } else {
        var query = `select cpf from tbUsuario where fk_organizacao = '${globalCnpj}'`;

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
        console.log("select da equipe de suporte");
        var instrucao = `
        select cpf,nome,telefone,cargo,statusServico from tbUsuario where fk_organizacao = ${globalCnpj};	
        `;

        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
}

// plotar computadores
function plotar_computadores() {
    if (globalCnpj == undefined) {
    } else {
        console.log("select da equipe de suporte");
        var instrucao = `
        select apelidoComputador from tbComputador where fk_idEvento = (select idEvento from tbEvento where fk_organizacao = ${globalCnpj} AND status = "Em andamento");
        `;

        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
}

module.exports = {

    pegarCnpj,
    plotar_computadores,
    plotar_equipe,
    buscarPorUser,
    excluirUser
};