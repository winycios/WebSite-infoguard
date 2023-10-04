var eventosModel = require("../models/eventosModel");

//buscar eventos
function buscarPorEvento(req, res) {
    var cnpj = req.query.cnpj;

    eventosModel.buscarPorEvento(cnpj).then((resultado) => {
        res.status(200).json(resultado);
    });
}

// cadastrar Evento
function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores
    var equipe1 = req.body.equipe1Server;
    var equipe2 = req.body.equipe2Server;
    var evento = req.body.eventoServer;
    var qtd = req.body.qtdServer;
    var cnpj = req.body.cnpjServer;

    eventosModel.buscarPorEvento(cnpj).then((resultado) => {
        if (resultado.length > 0) {
            // verifica se o usuario já existe
            res
                .status(401)
                .json({ mensagem: `Sua organização já tem um evento em andamento` });
        } else {
            eventosModel.cadastrar(equipe1, equipe2, evento, qtd, cnpj).then((resultado) => {
                res.status(200).json(resultado);
            });
        }
    });
}

// cadastrar Evento
function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores
    var equipe1 = req.body.equipe1Server;
    var equipe2 = req.body.equipe2Server;
    var evento = req.body.eventoServer;
    var qtd = req.body.qtdServer;
    var cnpj = req.body.cnpjServer;

    eventosModel.buscarPorEvento(cnpj).then((resultado) => {
        if (resultado.length > 0) {
            // verifica se o usuario já existe
            res
                .status(401)
                .json({ mensagem: `Sua organização já tem um evento em andamento` });
        } else {
            eventosModel.cadastrar(equipe1, equipe2, evento, qtd, cnpj).then((resultado) => {
                res.status(200).json(resultado);
            });
        }
    });
}

// cadastrar Evento
function finalizar(req, res) {
    // Crie uma variável que vá recuperar os valores
    var confirm = req.body.confirmacaoServer;
    var cnpj = req.body.cnpjServer;


    eventosModel.buscarPorEvento(cnpj).then((resultado) => {
        if (resultado.length > 0) {
            // verifica se o usuario já existe
            eventosModel.finalizar(confirm, cnpj).then((resultado) => {
                res.status(200).json(resultado);
            });
        } else {
                res
                .status(401)
                .json({ mensagem: `Sua organização não tem nenhum evento em andamento` });
        }
    });
}

// pegar cnpj
function pegarCnpj(req, res) {
    var cnpj = req.body.cnpjServer;

    eventosModel.pegarCnpj(cnpj).then((resultado) => {
        res.status(201).json(resultado);
    });
}

// metodos get
// listar computadores
function listarPCE1(req, res) {
    eventosModel.listarPCE1().then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    });
}

function listarPCE2(req, res) {
    eventosModel.listarPCE2().then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    });
}

/* select das equipes e nome do evento*/
function plotar_equipe(req, res) {
    eventosModel.plotar_equipe().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    });
}

module.exports = {
    cadastrar,
    buscarPorEvento,
    plotar_equipe,
    pegarCnpj,
    listarPCE1,
    listarPCE2,
    finalizar
}