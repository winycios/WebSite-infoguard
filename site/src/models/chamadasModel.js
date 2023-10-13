var database = require("../database/config")

var globalCnpj = null;


// cnpj da organização
function pegarCnpj(cnpj) {
    return new Promise((resolve) => {
        globalCnpj = cnpj;
        resolve(globalCnpj);
    });
}

// Atualizar chamado
function updatePendente(id, operador) {

    var query = `update tbOcorrencia set status = "Em andamento", fk_cpfOperador = ${operador} where idOcorrencia = ${id};`;

    return setTimeout(function () {
        statusOcupado(operador);
    }, 1000), database.executar(query);
}

function statusOcupado(operador) {
    return new Promise(() => {
        var query = `update tbUsuario set statusServico = "ocupado" where cpf = ${operador};`
        return database.executar(query);
    });
}

// finalizar chamado
function finalizarChamado(id, operador) {

    var query = `update tbOcorrencia set status = "Finalizado", fk_cpfOperador = ${operador} where idOcorrencia = ${id};`;

    return setTimeout(function () {
        statusLivre(operador);
    }, 1000), database.executar(query);
}

function statusLivre(operador) {
    return new Promise(() => {
        var query = `update tbUsuario set statusServico = "livre" where cpf = ${operador};`
        return database.executar(query);
    });
}

// buscar usuarios de uma organização
function buscarPorUser(cpf) {
    if (globalCnpj == undefined) {
    } else {
        var query = `select cpf from tbUsuario where cpf = ${cpf} AND statusServico = 'livre'`;

        return database.executar(query);
    }
}

/* select */

/* select dos chamados*/
function listarChamados() {
    console.log("select dos chamados");
    if (globalCnpj == undefined) {
    } else {

        var instrucao = `
    SELECT o.idOcorrencia, c.apelidoComputador,o.descricao, o.hora, o.status, u.nome, u.cpf FROM tbcomputador c
    INNER JOIN tbOcorrencia o ON o.fk_idComputador = c.idComputador
    LEFT JOIN tbUsuario u ON u.cpf = o.fk_cpfOperador where c.fk_idEvento = (select idEvento from tbEvento WHERE fk_organizacao = ${globalCnpj} AND status = "Em andamento");
    `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
}

// listar operadores
function listarOperadores() {
    if (globalCnpj == undefined) {
    } else {
        console.log("select dos operadores");

        var instrucao = `
        select cpf, nome as 'operador' from tbUsuario where fk_organizacao = ${globalCnpj};
    `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
}


module.exports = {
    listarChamados,
    listarOperadores,
    pegarCnpj,
    updatePendente,
    buscarPorUser,
    finalizarChamado
}