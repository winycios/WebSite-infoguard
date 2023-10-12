var express = require("express");
var router = express.Router();

var chamadasController = require("../controllers/chamadasController");


router.get("/listarChamados", function (req, res) {
    chamadasController.listarChamados(req, res);
  });

  module.exports = router;