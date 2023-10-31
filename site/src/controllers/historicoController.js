var historicoModel = require("../models/historicoModel");

// pegar cnpj
function pegarCnpj(req, res) {
    var cnpj = req.body.cnpjServer;

    historicoModel.pegarCnpj(cnpj).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function plotar_chamado(req, res) {

    var option = req.params.opcaoEvento;

    historicoModel.plotar_chamado(option).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res
                .status(401)
                .json({ mensagem: `Esse evento não teve ocorrências.` });
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar dados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarSelect(req, res) {
    historicoModel.listarSelect().then((resultado) => {
        res.status(200).json(resultado);
    });
}


function listarEquipe(req, res) {
    var option = req.params.opcaoEvento;

    historicoModel.listarEquipe(option).then((resultado) => {
        res.status(200).json(resultado);
    });
}

module.exports = {
    pegarCnpj,
    plotar_chamado,
    listarSelect,
    listarEquipe
}