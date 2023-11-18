var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatorioController");

router.delete("/excluirUser", function (req, res) {
    relatorioController.excluirUser(req, res);
});

router.delete("/excluirPc", function (req, res) {
    relatorioController.excluirPc(req, res);
});

router.post("/pegarCnpj", function (req, res) {
    relatorioController.pegarCnpj(req, res);
});


router.put("/updateUser", function (req, res) {
    relatorioController.updateUser(req, res);
});
// metodos get

//mostrar as pessoas da equipe de suporte
router.get("/plotar_equipe", function (req, res) {
    relatorioController.plotar_equipe(req, res);
});

router.get("/plotar_computadores", function (req, res) {
    relatorioController.plotar_computadores(req, res);
});

router.get("/plotar_chamado", function (req, res) {
    relatorioController.plotar_chamado(req, res);
});

module.exports = router;