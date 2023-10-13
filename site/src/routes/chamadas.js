var express = require("express");
var router = express.Router();

var chamadasController = require("../controllers/chamadasController");

router.post("/pegarCnpj", function (req, res) {
  chamadasController.pegarCnpj(req, res);
});

router.put("/updatePendente", function (req, res) {
  chamadasController.updatePendente(req, res);
});

router.put("/finalizarChamado", function (req, res) {
  chamadasController.finalizarChamado(req, res);
});

// metodo get 
router.get("/listarChamados", function (req, res) {
    chamadasController.listarChamados(req, res);
  });

  router.get("/listarOperadores", function (req, res) {
    chamadasController.listarOperadores(req, res);
  });

  module.exports = router;