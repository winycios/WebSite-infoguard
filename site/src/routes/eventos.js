var express = require("express");
var router = express.Router();

var eventoController = require("../controllers/eventosController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    eventoController.cadastrar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/pegarCnpj", function (req, res) {
    eventoController.pegarCnpj(req, res);
});

router.post("/finalizar", function (req, res) {
    eventoController.finalizar(req, res);
});

// metodos get

//mostrar dados das equipes
router.get("/plotar_equipe", function (req, res) {
    eventoController.plotar_equipe(req, res);
});

//mostrar os pcs adicinados
router.get("/listarPCE1", function (req, res) {
    eventoController.listarPCE1(req, res);
});

router.get("/listarPCE2", function (req, res) {
    eventoController.listarPCE2(req, res);
});

module.exports = router;