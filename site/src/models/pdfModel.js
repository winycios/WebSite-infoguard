var database = require("../database/config");


function pegarDadosEvento(cnpj) {
    var query = `select idEvento, o.nome as 'org', e.nome, e.time1, e.time2, e.status from tbEvento e
    INNER JOIN tbOrganizacao o ON e.fk_organizacao = o.cnpj 
    where fk_organizacao = ${cnpj};`;

    return database.executar(query);
}

function pegarDadosComputador(cnpj) {
    var query = `
    SELECT
        e.idEvento, e.nome AS nomeEvento, c.apelidoComputador, u.nome as 'operador', o.descricao, o.hora
    FROM tbComputador c
        INNER JOIN TbEvento e ON c.fk_idEvento = e.idEvento
        INNER JOIN TbOcorrencia o ON o.fk_idComputador = c.idComputador
        INNER JOIN TbUsuario u ON o.fk_cpfOperador = u.cpf
    WHERE
        e.fk_organizacao = ${cnpj};`;

    return database.executar(query);
}

function pegarDadosOcorrencia(cnpj) {
    var query = `
    SELECT e.nome AS nomeEvento, c.apelidoComputador, COUNT(o.fk_idComputador) AS ocorrencia
    FROM tbComputador c
        INNER JOIN TbEvento e ON c.fk_idEvento = e.idEvento
        INNER JOIN TbOcorrencia o ON o.fk_idComputador = c.idComputador
    WHERE e.fk_organizacao = ${cnpj}
    GROUP BY e.nome, c.apelidoComputador;`


    return database.executar(query);
}

function pegarDadosOperador(cnpj) {
    var query = `
    select u.nome ,COUNT(fk_cpfOperador) as 'contagem', u.cargo  from tbOcorrencia o
        RIGHT JOIN tbUsuario u ON u.cpf = o.fk_cpfOperador
    where fk_organizacao = ${cnpj}
    GROUP BY u.nome, u.cargo;`


    return database.executar(query);
}


module.exports = { pegarDadosEvento, pegarDadosComputador, pegarDadosOcorrencia, pegarDadosOperador };
