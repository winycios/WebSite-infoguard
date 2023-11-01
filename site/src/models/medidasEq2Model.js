var database = require("../database/config");


// equipe 2
// todos
function buscarMedidasEmTempoRealTodosEq2(idComputador) {

    instrucaoSql = `select cpuTemp, gpuTemp, cpuFreq , gpuFreq, ram, redeLatencia, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbMonitoramento where fk_idComputador = ${idComputador} order by dataHora desc limit 1;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// temperatura da GPU e CPU
function buscarUltimasMedidasTempEq2(idComputador, limite_linhas) {


    instrucaoSql = `select cpuTemp, gpuTemp, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbMonitoramento where fk_idComputador = ${idComputador} order by dataHora desc limit ${limite_linhas};`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealTempEq2(idComputador) {

    instrucaoSql = ''


    instrucaoSql = `select cpuTemp, gpuTemp, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbMonitoramento where fk_idComputador = ${idComputador} order by dataHora desc limit 1;`


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// frequencia da GPU e CPU
function buscarUltimasMedidasFreqEq2(idComputador, limite_linhas) {


    instrucaoSql = `select cpuFreq, gpuFreq, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbMonitoramento where fk_idComputador = ${idComputador} order by dataHora desc limit ${limite_linhas};`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealFreqEq2(idComputador) {

    instrucaoSql = ''


    instrucaoSql = `select cpuFreq, gpuFreq, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbMonitoramento where fk_idComputador = ${idComputador} order by dataHora desc limit 1;`


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Rede e pacote
function buscarUltimasMedidasRedeEq2(idComputador, limite_linhas) {


    instrucaoSql = `select redeLatencia, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbMonitoramento where fk_idComputador = ${idComputador} order by dataHora desc limit ${limite_linhas};`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRedeEq2(idComputador) {

    instrucaoSql = ''


    instrucaoSql = `select redeLatencia, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbMonitoramento where fk_idComputador = ${idComputador} order by dataHora desc limit 1;`


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


// disco e ram
function buscarUltimasMedidasAuxEq2(idComputador, limite_linhas) {


    instrucaoSql = `select disco, ram, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbMonitoramento where fk_idComputador = ${idComputador} order by dataHora desc limit ${limite_linhas};`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealAuxEq2(idComputador) {

    instrucaoSql = ''


    instrucaoSql = `select disco, ram, DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbMonitoramento where fk_idComputador = ${idComputador} order by dataHora desc limit 1;`


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarUltimasMedidasAuxEq2,
    buscarMedidasEmTempoRealAuxEq2,
    buscarMedidasEmTempoRealRedeEq2,
    buscarUltimasMedidasRedeEq2,
    buscarUltimasMedidasTempEq2,
    buscarMedidasEmTempoRealTempEq2,
    buscarUltimasMedidasFreqEq2,
    buscarMedidasEmTempoRealFreqEq2,
    buscarMedidasEmTempoRealTodosEq2
}