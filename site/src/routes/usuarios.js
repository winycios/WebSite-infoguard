var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/pegarCnpj", function (req, res) {
    usuarioController.pegarCnpj(req, res);
});

router.post("/pegarCpf", function (req, res) {
    usuarioController.pegarCpf(req, res);
});

router.put("/updateUsuario/:cpfUser", function (req, res) {
    chamadasController.alterarNome(req, res);
  });

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.get("/liders", function (req, res) {
    usuarioController.trazerLider(req, res);
})

router.get("/users/:cpfUser", function (req, res) {
    usuarioController.trazerUsuario(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/renovarSenha", function (req, res) {
    usuarioController.renovarSenha(req, res);
});

module.exports = router;