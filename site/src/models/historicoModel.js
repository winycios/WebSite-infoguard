var database = require('../database/config')
var globalCnpj = null;


// cnpj da organização
function pegarCnpj(cnpj) {
    return new Promise((resolve) => {
        globalCnpj = cnpj;
        resolve(globalCnpj);
    });
}

// pegar os chamados daquele evento
function plotar_chamado(opcaoEvento) {


    instrucaoSql = ` SELECT c.apelidoComputador, o.descricao, o.hora, u.nome
    FROM tbcomputador c
    INNER JOIN tbOcorrencia o ON o.fk_idComputador = c.idComputador
    LEFT JOIN tbUsuario u ON u.cpf = o.fk_cpfOperador 
    WHERE c.fk_idEvento = ${opcaoEvento};`;


    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}

// lista todos os eventos que já aconteceram
function listarSelect() {
    var query = `select idEvento, nome from tbEvento where fk_organizacao = ${globalCnpj} AND status = 'Concluido';`;

    return database.executar(query);
}

function listarEquipe(opcaoEvento) {
    var query = `select nome, time1, time2 from tbEvento where idEvento = ${opcaoEvento};`;

    return database.executar(query);
}

module.exports = {

    pegarCnpj,
    plotar_chamado,
    listarSelect,
    listarEquipe
};