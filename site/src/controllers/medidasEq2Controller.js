var medidaModel = require("../models/medidasEq2Model");


// equipe 2
// ------------------------ temperatura
function buscarUltimasMedidasTempEq2(req, res) {

    const limite_linhas = 1;

    var apelidoMaquina = req.params.apelidoMaquina;

    medidaModel.buscarUltimasMedidasTempEq2(apelidoMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res
            .status(401)
            .json({ mensagem: `Esse computador não está sendo monitorado` });
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoRealTempEq2(req, res) {

    var apelidoMaquina = req.params.apelidoMaquina;

    medidaModel.buscarMedidasEmTempoRealTempEq2(apelidoMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado da temperatura foi encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


// ------------------------ frequencia
function buscarUltimasMedidasFreqEq2(req, res) {

    const limite_linhas = 1;

    var apelidoMaquina = req.params.apelidoMaquina;

    medidaModel.buscarUltimasMedidasFreqEq2(apelidoMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado da frequencia foi encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoRealFreqEq2(req, res) {

    var apelidoMaquina = req.params.apelidoMaquina;

    medidaModel.buscarMedidasEmTempoRealFreqEq2(apelidoMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado da frequencia foi encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// ------------------------ Rede
function buscarUltimasMedidasRedeEq2(req, res) {

    const limite_linhas = 4;

    var apelidoMaquina = req.params.apelidoMaquina;

    medidaModel.buscarUltimasMedidasRedeEq2(apelidoMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado da Rede foi encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoRealRedeEq2(req, res) {

    var apelidoMaquina = req.params.apelidoMaquina;

    medidaModel.buscarMedidasEmTempoRealRedeEq2(apelidoMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado da Rede foi encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// ------------------------ Aux
function buscarUltimasMedidasAuxEq2(req, res) {

    const limite_linhas = 1;

    var apelidoMaquina = req.params.apelidoMaquina;

    medidaModel.buscarUltimasMedidasAuxEq2(apelidoMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado da Auxiliares foi encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoRealAuxEq2(req, res) {

    var apelidoMaquina = req.params.apelidoMaquina;

    medidaModel.buscarMedidasEmTempoRealAuxEq2(apelidoMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado da Auxiliares foi encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    buscarUltimasMedidasAuxEq2,
    buscarMedidasEmTempoRealAuxEq2,
    buscarUltimasMedidasRedeEq2,
    buscarMedidasEmTempoRealRedeEq2,
    buscarUltimasMedidasFreqEq2,
    buscarMedidasEmTempoRealFreqEq2,
    buscarUltimasMedidasTempEq2,
    buscarMedidasEmTempoRealTempEq2
}