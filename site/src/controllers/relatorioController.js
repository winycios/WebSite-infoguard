var relatorioModel = require("../models/relatorioModel");

// pegar cnpj
function pegarCnpj(req, res) {
    var cnpj = req.body.cnpjServer;

    relatorioModel.pegarCnpj(cnpj).then((resultado) => {
        res.status(201).json(resultado);
    });
}

// buscar por usuarios em uma organização

function buscarPorUser(req, res) {

    relatorioModel.buscarPorUser().then((resultado) => {
        res.status(200).json(resultado);
    });
}

function buscarPorChamados(req, res) {

    relatorioModel.buscarPorChamados(cpf).then((resultado) => {
        res.status(200).json(resultado);
    });
}


// excluir usuario
function excluirUser(req, res) {
    // Crie uma variável que vá recuperar os valores
    var cpf = req.body.cpfServer;

    relatorioModel.buscarPorChamados(cpf).then((result) => {
        relatorioModel.buscarPorUser().then((resultado) => {
            if (resultado.length == 1) {
                res
                    .status(401)
                    .json({ mensagem: `É necessário ter pelo menos um integrante na organização` });

            } else if (result.length > 0) {
                res
                .status(401)
                .json({ mensagem: `Não é possível excluir esse usuário, pois ele já lidou com solicitações.` });
            } else {
                relatorioModel.excluirUser(cpf).then((resultado) => {
                    res.status(200).json(resultado);
                });
            }
        });
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
    relatorioModel.plotar_equipe()
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(error => {
            console.error("Erro ao plotar equipe:", error);
            res.status(500).send("Erro interno no servidor");
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
    const plotarPromise = relatorioModel.plotar_chamado();

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



module.exports = {
    pegarCnpj,
    excluirUser,
    plotar_computadores,
    buscarPorUser,
    updateUser,
    plotar_equipe,
    buscarPorChamados,
    plotar_chamado
}