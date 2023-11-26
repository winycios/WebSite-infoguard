var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/renovarSenha", function (req, res) {
    usuarioController.renovarSenha(req, res);
});


// Conteudo da tela de usuario

// update - put
router.put("/updateUser", function (req, res) {
    usuarioController.updateUser(req, res);
});


// delete 
router.delete("/excluirUser", function (req, res) {
    usuarioController.excluirUser(req, res);
});

// get
router.get("/plotar_dados/:cpf", function (req, res) {
    usuarioController.plotar_dados(req, res);
});

router.get("/plotar_gerente/:cnpj", function (req, res) {
    usuarioController.plotar_gerente(req, res);
});

router.get("/plotar_chamado/:cnpj/:cpf", function (req, res) {
    usuarioController.plotar_chamado(req, res);
});
module.exports = router;