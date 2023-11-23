var database = require('../database/config');
var globalCnpj = null;


function buscaCnpj(cnpj) {
    if (cnpj === 0) {
        instrucaoSql = '';
        return Promise.reject(new Error('CNPJ cannot be 0 or undefined'));
    }

    instrucaoSql = `select cnpj from tbOrganizacao where cnpj = ${cnpj}`

    return database.executar(instrucaoSql);
}
// equipe 1

// todos
function buscarMedidasEmTempoRealTodosEq1(cnpj) {

    if (process.env.AMBIENTE_PROCESSO == 'producao') {
        instrucaoSql = `SELECT apelidoComputador, cpuTemp, gpuTemp, cpuFreq, gpuFreq, ram, redeLatencia, FORMAT(dataHora, 'HH:mm:ss') as momento_grafico
        FROM (
            SELECT c.apelidoComputador, m.cpuTemp, m.gpuTemp, m.cpuFreq, m.gpuFreq, m.ram, m.redeLatencia, m.dataHora,
                   ROW_NUMBER() OVER (PARTITION BY c.idComputador ORDER BY m.dataHora DESC) AS row_num
            FROM tbEvento e
                INNER JOIN tbComputador c ON c.fk_idEvento = e.idEvento
                LEFT JOIN tbMonitoramento m ON m.fk_idComputador = c.idComputador
            WHERE e.fk_Organizacao = ${cnpj} AND e.status = 'Em andamento' AND c.apelidoComputador LIKE 
                CONCAT('%', (SELECT time1 FROM tbEvento WHERE fk_organizacao = ${cnpj} AND status = 'Em andamento'))
        ) AS subquery
        WHERE row_num = 1
        ORDER BY dataHora DESC;`;

    }
    else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
        instrucaoSql = `SELECT apelidoComputador, cpuTemp, gpuTemp, cpuFreq , gpuFreq, ram, redeLatencia, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico
        FROM (
            SELECT c.apelidoComputador, m.cpuTemp, m.gpuTemp, m.cpuFreq , m.gpuFreq, m.ram, m.redeLatencia, m.dataHora,
                   ROW_NUMBER() OVER (PARTITION BY c.idComputador ORDER BY m.dataHora DESC) AS row_num
            FROM tbEvento e
                INNER JOIN tbComputador c ON c.fk_idEvento = e.idEvento
                LEFT JOIN tbMonitoramento m ON m.fk_idComputador = c.idComputador
            WHERE e.fk_Organizacao = ${cnpj} AND e.status = 'Em andamento' AND c.apelidoComputador LIKE 
                CONCAT('%', (SELECT time1 FROM tbEvento WHERE fk_organizacao = ${cnpj} AND status = 'Em andamento'))
        ) AS subquery
        WHERE row_num = 1
        ORDER BY dataHora DESC;`

    } else {
        console.log('\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n');
        return
    }

    return database.executar(instrucaoSql);
}
// temperatura da GPU e CPU
function buscarUltimasMedidasTempEq1(idComputador, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == 'producao') {
        instrucaoSql = `SELECT top ${limite_linhas}
        cpuTemp, gpuTemp, FORMAT(dataHora, 'HH:mm:ss') as momento_grafico
                FROM tbMonitoramento
                WHERE fk_idComputador = ${idComputador}
                ORDER BY dataHora DESC;`;

    } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
        instrucaoSql = `select cpuTemp, gpuTemp, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbMonitoramento where fk_idComputador = ${idComputador} order by dataHora desc limit ${limite_linhas};`;
    } else {
        console.log('\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n');
        return
    }


    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealTempEq1(idComputador) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == 'producao') {
        instrucaoSql = `SELECT top 1
        cpuTemp, gpuTemp, FORMAT(dataHora, 'HH:mm:ss') as momento_grafico
                FROM tbMonitoramento
                WHERE fk_idComputador = ${idComputador}
                ORDER BY dataHora DESC;`;

    } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
        instrucaoSql = `select cpuTemp, gpuTemp, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbMonitoramento where fk_idComputador = ${idComputador} order by dataHora desc limit 1;`
    } else {
        console.log('\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n');
        return
    }

    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}

// frequencia da GPU e CPU
function buscarUltimasMedidasFreqEq1(idComputador, limite_linhas) {

    if (process.env.AMBIENTE_PROCESSO == 'producao') {
        instrucaoSql = `SELECT top ${limite_linhas}
        cpuFreq, gpuFreq, FORMAT(dataHora, 'HH:mm:ss') as momento_grafico
                FROM tbMonitoramento
                WHERE fk_idComputador = ${idComputador}
                ORDER BY dataHora DESC;`;

    } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
        instrucaoSql = `select cpuFreq, gpuFreq, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbMonitoramento where fk_idComputador = ${idComputador} order by dataHora desc limit ${limite_linhas};`;
    } else {
        console.log('\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n');
        return
    }


    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealFreqEq1(idComputador) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == 'producao') {
        instrucaoSql = `SELECT top 1
        cpuFreq, gpuFreq, FORMAT(dataHora, 'HH:mm:ss') as momento_grafico
                FROM tbMonitoramento
                WHERE fk_idComputador = ${idComputador}
                ORDER BY dataHora DESC;`;

    } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
        instrucaoSql = `select cpuFreq, gpuFreq, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbMonitoramento where fk_idComputador = ${idComputador} order by dataHora desc limit 1;`
    } else {
        console.log('\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n');
        return
    }

    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Rede e pacote
function buscarUltimasMedidasRedeEq1(idComputador, limite_linhas) {


    if (process.env.AMBIENTE_PROCESSO == 'producao') {
        instrucaoSql = `SELECT top ${limite_linhas}
        redeLatencia, FORMAT(dataHora, 'HH:mm:ss') as momento_grafico
                FROM tbMonitoramento
                WHERE fk_idComputador = ${idComputador}
                ORDER BY dataHora DESC;`;

    } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
        instrucaoSql = `select redeLatencia, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbMonitoramento where fk_idComputador = ${idComputador} order by dataHora desc limit ${limite_linhas};`;
    } else {
        console.log('\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n');
        return
    }


    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRedeEq1(idComputador) {

    instrucaoSql = ''


    if (process.env.AMBIENTE_PROCESSO == 'producao') {
        instrucaoSql = `SELECT top 1
        redeLatencia, FORMAT(dataHora, 'HH:mm:ss') as momento_grafico
                FROM tbMonitoramento
                WHERE fk_idComputador = ${idComputador}
                ORDER BY dataHora DESC;`;

    } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
        instrucaoSql = `select redeLatencia, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbMonitoramento where fk_idComputador = ${idComputador} order by dataHora desc limit 1;`
    } else {
        console.log('\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n');
        return
    }


    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}


// disco e ram
function buscarUltimasMedidasAuxEq1(idComputador, limite_linhas) {


    if (process.env.AMBIENTE_PROCESSO == 'producao') {
        instrucaoSql = `SELECT top ${limite_linhas}
        disco,ram, FORMAT(dataHora, 'HH:mm:ss') as momento_grafico
                FROM tbMonitoramento
                WHERE fk_idComputador = ${idComputador}
                ORDER BY dataHora DESC;`;

    } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
        instrucaoSql = `select disco, ram, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbMonitoramento where fk_idComputador = ${idComputador} order by dataHora desc limit ${limite_linhas};`;
    } else {
        console.log('\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n');
        return
    }

    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealAuxEq1(idComputador) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == 'producao') {
        instrucaoSql = `SELECT top 1
        disco,ram, FORMAT(dataHora, 'HH:mm:ss') as momento_grafico
                FROM tbMonitoramento
                WHERE fk_idComputador = ${idComputador}
                ORDER BY dataHora DESC;`;

    } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
        instrucaoSql = `select disco, ram, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbMonitoramento where fk_idComputador = ${idComputador} order by dataHora desc limit 1;`
    } else {
        console.log('\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n');
        return
    }
    


    console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarUltimasMedidasAuxEq1,
    buscarMedidasEmTempoRealAuxEq1,
    buscarMedidasEmTempoRealRedeEq1,
    buscarUltimasMedidasRedeEq1,
    buscarUltimasMedidasTempEq1,
    buscarMedidasEmTempoRealTempEq1,
    buscaCnpj,
    buscarUltimasMedidasFreqEq1,
    buscarMedidasEmTempoRealFreqEq1,
    buscarMedidasEmTempoRealTodosEq1
}