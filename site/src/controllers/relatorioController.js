var relatorioModel = require("../models/relatorioModel");

// pegar cnpj
function pegarCnpj(req, res) {
    var cnpj = req.body.cnpjServer;

    relatorioModel.pegarCnpj(cnpj).then((resultado) => {
        res.status(201).json(resultado);
    });
}

// buscar por usuarios em uma organização
//buscar eventos
function buscarPorUser(req, res) {

    relatorioModel.buscarPorUser().then((resultado) => {
        res.status(200).json(resultado);
    });
}

// excluir usuario
function excluirUser(req, res) {
    // Crie uma variável que vá recuperar os valores
    var cpf = req.body.cpfServer;


    relatorioModel.buscarPorUser().then((resultado) => {
        if (resultado.length == 1) {
            res
                .status(401)
                .json({ mensagem: `É necessário ter pelo menos um integrante na organização` });
        } else {
            // verifica se o usuario já existe
            relatorioModel.excluirUser(cpf).then((resultado) => {
                res.status(200).json(resultado);
            });

        }
    });
}

// atualizar dados
function updateUser(req, res) {
    // Crie uma variável que vá recuperar os valores
    var cargo = req.body.cargoServer;
    var cpf = req.body.cpfServer;

    relatorioModel.updateUser(cpf, cargo).then((resultado) => {
        res.status(200).json(resultado);
    });
}

// metodos get

/* select da equipe de suporte*/
function plotar_equipe(req, res) {
    relatorioModel.plotar_equipe().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    });
}

function plotar_computadores(req, res) {
    relatorioModel.plotar_computadores().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res
                .status(401)
                .json({ mensagem: `Nenhum evento acontecendo no momento` });
        }
    });
}


function plotar_chamado(req, res) {
    relatorioModel.plotar_chamado().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res
                .status(401)
                .json({ mensagem: `Nenhum chamado encotrado` });
        }
    });
}


module.exports = {
    pegarCnpj,
    excluirUser,
    plotar_computadores,
    buscarPorUser,
    updateUser,
    plotar_equipe,
    plotar_chamado
}