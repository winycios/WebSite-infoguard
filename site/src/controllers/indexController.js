var indexModel = require("../models/indexModel");

// pegar cnpj
function pegarCnpj(req, res) {
    var cnpj = req.body.cnpjServer;

    indexModel.pegarCnpj(cnpj).then((resultado) => {
        res.status(201).json(resultado);
    });
}


// metodos get

function plotar_chamado(req, res) {
    const plotarPromise = indexModel.plotar_chamado();

    if (plotarPromise && typeof plotarPromise.then === 'function') {
        plotarPromise.then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(401).json({ mensagem: `Nenhum chamado encontrado` });
            }
        });
    } else {
        res.status(500).json({ mensagem: `Erro ao obter dados do chamado` });
    }
}

function plotar_evento(req, res) {
    const plotarPromise = indexModel.plotar_evento();

    if (plotarPromise && typeof plotarPromise.then === 'function') {
        plotarPromise.then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(401).json({ mensagem: `Nenhum evento encontrado` });
            }
        });
    } else {
        res.status(500).json({ mensagem: `Erro ao obter um chamado` });
    }
}


// ------------------------ temperatura
function buscarUltimasMedidasTemp(req, res) {

    indexModel.buscarUltimasMedidasTemp().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res
            .status(401)
            .json({ mensagem: `Não há computadores sendo monitorados` });
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoRealTemp(req, res) {

    indexModel.buscarMedidasEmTempoRealTemp().then(function (resultado) {
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
function buscarUltimasMedidasFreq(req, res) {

    indexModel.buscarUltimasMedidasFreq().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res
            .status(401)
            .json({ mensagem: `Não há computadores sendo monitorados` });
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoRealFreq(req, res) {

    indexModel.buscarMedidasEmTempoRealFreq().then(function (resultado) {
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
function buscarUltimasMedidasRede(req, res) {

    indexModel.buscarUltimasMedidasRede().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res
            .status(401)
            .json({ mensagem: `Não há computadores sendo monitorados` });
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoRealRede(req, res) {

    indexModel.buscarMedidasEmTempoRealRede().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado da rede foi encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// ------------------------ Ocorrencia
function buscarUltimasMedidasOco(req, res) {

    indexModel.buscarUltimasMedidasOco().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res
            .status(401)
            .json({ mensagem: `Não há computadores sendo monitorados` });
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoRealOco(req, res) {

    indexModel.buscarMedidasEmTempoRealOco().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado da ocorrencia foi encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    pegarCnpj,
    plotar_chamado,
    plotar_evento,
    buscarMedidasEmTempoRealTemp,
    buscarUltimasMedidasTemp,
    buscarUltimasMedidasFreq,
    buscarMedidasEmTempoRealFreq,
    buscarUltimasMedidasRede,
    buscarMedidasEmTempoRealRede,
    buscarUltimasMedidasOco,
    buscarMedidasEmTempoRealOco
}