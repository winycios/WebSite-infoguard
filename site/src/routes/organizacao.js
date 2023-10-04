var express = require("express");
var router = express.Router();

var organizacaoController = require("../controllers/organizacaoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    organizacaoController.cadastrar(req, res);
})

router.get("/listar", function (req, res) {
  organizacaoController.listar(req, res);
});

module.exports = router;