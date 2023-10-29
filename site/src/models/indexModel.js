var database = require("../database/config")
var globalCnpj = null;


// cnpj da organização
function pegarCnpj(cnpj) {
    return new Promise((resolve) => {
        globalCnpj = cnpj;
        resolve(globalCnpj);
    });
}


// metodo get


// plotar computadores
function plotar_chamado() {
    if (globalCnpj == undefined) {
    } else {
        console.log("select dos chamados");
        var instrucao = `
        select c.apelidoComputador, o.status, o.descricao, u.nome, o.hora from tbComputador c 
        INNER JOIN tbOcorrencia o ON c.idComputador = o.fk_idComputador
        LEFT JOIN tbUsuario u ON u.cpf = o.fk_cpfOperador where fk_idEvento = (select idEvento from tbEvento where fk_organizacao = ${globalCnpj} AND status = "Em andamento");
        `;

        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
}

function plotar_evento() {
    if (globalCnpj == undefined) {
    } else {
        console.log("select dos chamados");
        var instrucao = `
        select nome from tbEvento where fk_organizacao = ${globalCnpj} AND status = "Em andamento";`;

        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
}


// graficos

// temperatura
function buscarUltimasMedidasTemp() {


    instrucaoSql = `SELECT apelidoComputador, cpuTemp, gpuTemp, dataHora
    FROM (
        SELECT c.apelidoComputador, m.cpuTemp, m.gpuTemp, m.dataHora,
               ROW_NUMBER() OVER (PARTITION BY c.idComputador ORDER BY m.dataHora DESC) AS row_num
        FROM tbEvento e
            INNER JOIN tbComputador c ON c.fk_idEvento = e.idEvento
            LEFT JOIN tbMonitoramento m ON m.fk_idComputador = c.idComputador
        WHERE e.fk_Organizacao = ${globalCnpj} AND e.status = "Em andamento"
    ) AS subquery
    WHERE row_num = 1
    ORDER BY dataHora DESC;`;

    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealTemp() {

    instrucaoSql = ''


    instrucaoSql = `SELECT apelidoComputador, cpuTemp, gpuTemp, dataHora
    FROM (
        SELECT c.apelidoComputador, m.cpuTemp, m.gpuTemp, m.dataHora,
               ROW_NUMBER() OVER (PARTITION BY c.idComputador ORDER BY m.dataHora DESC) AS row_num
        FROM tbEvento e
            INNER JOIN tbComputador c ON c.fk_idEvento = e.idEvento
            LEFT JOIN tbMonitoramento m ON m.fk_idComputador = c.idComputador
        WHERE e.fk_Organizacao = ${globalCnpj} AND e.status = "Em andamento"
    ) AS subquery
    WHERE row_num = 1
    ORDER BY dataHora DESC;`

    return database.executar(instrucaoSql);
}

// frequencia
function buscarUltimasMedidasFreq() {

    instrucaoSql = ''

    instrucaoSql = `SELECT apelidoComputador, cpuFreq, gpuFreq, dataHora
    FROM (
        SELECT c.apelidoComputador, m.cpuFreq, m.gpuFreq, m.dataHora,
               ROW_NUMBER() OVER (PARTITION BY c.idComputador ORDER BY m.dataHora DESC) AS row_num
        FROM tbEvento e
            INNER JOIN tbComputador c ON c.fk_idEvento = e.idEvento
            LEFT JOIN tbMonitoramento m ON m.fk_idComputador = c.idComputador
        WHERE e.fk_Organizacao = ${globalCnpj} AND e.status = "Em andamento"
    ) AS subquery
    WHERE row_num = 1
    ORDER BY dataHora DESC;`;

    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealFreq() {

    instrucaoSql = ''


    instrucaoSql = `SELECT apelidoComputador, cpuFreq, gpuFreq, dataHora
    FROM (
        SELECT c.apelidoComputador, m.cpuFreq, m.gpuFreq, m.dataHora,
               ROW_NUMBER() OVER (PARTITION BY c.idComputador ORDER BY m.dataHora DESC) AS row_num
        FROM tbEvento e
            INNER JOIN tbComputador c ON c.fk_idEvento = e.idEvento
            LEFT JOIN tbMonitoramento m ON m.fk_idComputador = c.idComputador
        WHERE e.fk_Organizacao = ${globalCnpj} AND e.status = "Em andamento"
    ) AS subquery
    WHERE row_num = 1
    ORDER BY dataHora DESC;`

    return database.executar(instrucaoSql);
}

// Rede
function buscarUltimasMedidasRede() {

    instrucaoSql = ''

    instrucaoSql = `select m.redeLatencia, DATE_FORMAT(m.dataHora,'%H:%i:%s') as momento_grafico from tbEvento e
    INNER JOIN tbComputador c ON c.fk_idEvento = e.idEvento
           INNER JOIN tbMonitoramento m ON m.fk_idComputador = c.idComputador
       WHERE e.fk_Organizacao = ${globalCnpj} AND e.status = "Em andamento"
       order by momento_grafico Desc limit 4;`;

    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRede() {

    instrucaoSql = ''

    instrucaoSql = `select m.redeLatencia, DATE_FORMAT(m.dataHora,'%H:%i:%s') as momento_grafico from tbEvento e
    INNER JOIN tbComputador c ON c.fk_idEvento = e.idEvento
           INNER JOIN tbMonitoramento m ON m.fk_idComputador = c.idComputador
       WHERE e.fk_Organizacao = ${globalCnpj} AND e.status = "Em andamento"
       order by momento_grafico Desc limit 4`;

    return database.executar(instrucaoSql);
}


// Ocorrencia
function buscarUltimasMedidasOco() {

    instrucaoSql = ''

    instrucaoSql = `SELECT
    (SELECT COUNT(o.status) 
     FROM tbOcorrencia o
     INNER JOIN tbComputador c ON c.idComputador = o.fk_idComputador
     INNER JOIN tbEvento e ON c.fk_idEvento = e.idEvento
     WHERE e.fk_Organizacao = ${globalCnpj} AND e.status = 'Em andamento' AND o.status = 'Pendente') as pendente,

    (SELECT COUNT(o.status) 
     FROM tbOcorrencia o
     INNER JOIN tbComputador c ON c.idComputador = o.fk_idComputador
     INNER JOIN tbEvento e ON c.fk_idEvento = e.idEvento
     WHERE e.fk_Organizacao = ${globalCnpj} AND e.status = 'Em andamento' AND o.status = 'Em andamento') as andamento,

    (SELECT COUNT(o.status) 
     FROM tbOcorrencia o
     INNER JOIN tbComputador c ON c.idComputador = o.fk_idComputador
     INNER JOIN tbEvento e ON c.fk_idEvento = e.idEvento
     WHERE e.fk_Organizacao = ${globalCnpj} AND e.status = 'Em andamento' AND o.status = 'Finalizado') as resolvido,

    hora

FROM tbOcorrencia o
INNER JOIN tbComputador c ON c.idComputador = o.fk_idComputador
INNER JOIN tbEvento e ON c.fk_idEvento = e.idEvento

WHERE e.fk_Organizacao = ${globalCnpj} AND e.status = 'Em andamento'
GROUP BY hora
ORDER BY hora DESC LIMIT 1;`;

    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealOco() {

    instrucaoSql = ''

    instrucaoSql = `SELECT
    (SELECT COUNT(o.status) 
     FROM tbOcorrencia o
     INNER JOIN tbComputador c ON c.idComputador = o.fk_idComputador
     INNER JOIN tbEvento e ON c.fk_idEvento = e.idEvento
     WHERE e.fk_Organizacao = ${globalCnpj} AND e.status = 'Em andamento' AND o.status = 'Pendente') as pendente,

    (SELECT COUNT(o.status) 
     FROM tbOcorrencia o
     INNER JOIN tbComputador c ON c.idComputador = o.fk_idComputador
     INNER JOIN tbEvento e ON c.fk_idEvento = e.idEvento
     WHERE e.fk_Organizacao = ${globalCnpj} AND e.status = 'Em andamento' AND o.status = 'Em andamento') as andamento,

    (SELECT COUNT(o.status) 
     FROM tbOcorrencia o
     INNER JOIN tbComputador c ON c.idComputador = o.fk_idComputador
     INNER JOIN tbEvento e ON c.fk_idEvento = e.idEvento
     WHERE e.fk_Organizacao = ${globalCnpj} AND e.status = 'Em andamento' AND o.status = 'Finalizado') as resolvido,

    hora

FROM tbOcorrencia o
INNER JOIN tbComputador c ON c.idComputador = o.fk_idComputador
INNER JOIN tbEvento e ON c.fk_idEvento = e.idEvento

WHERE e.fk_Organizacao = ${globalCnpj} AND e.status = 'Em andamento'
GROUP BY hora
ORDER BY hora DESC LIMIT 1;`;

    return database.executar(instrucaoSql);
}


module.exports = {

    pegarCnpj,
    plotar_chamado,
    plotar_evento,
    buscarUltimasMedidasTemp,
    buscarMedidasEmTempoRealTemp,
    buscarUltimasMedidasFreq,
    buscarMedidasEmTempoRealFreq,
    buscarUltimasMedidasRede,
    buscarMedidasEmTempoRealRede,
    buscarUltimasMedidasOco,
    buscarMedidasEmTempoRealOco
};