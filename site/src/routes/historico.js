var express = require("express");
var router = express.Router();

var historicoController = require("../controllers/historicoController");


router.post("/pegarCnpj", function (req, res) {
    historicoController.pegarCnpj(req, res);
});


router.get("/plotar_chamado/:opcaoEvento", function (req, res) {
    historicoController.plotar_chamado(req, res);
});

router.get("/listarEquipe/:opcaoEvento", function (req, res) {
    historicoController.listarEquipe(req, res);
});


router.get("/listarSelect", function (req, res) {
    historicoController.listarSelect(req, res);
});

module.exports = router;