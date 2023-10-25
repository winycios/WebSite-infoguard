var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidasController");


//equipe 1
// temperatura
router.get("/ultimasTempEq1/:apelidoMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasTempEq1(req, res);
});

router.get("/tempo-realTempEq1/:apelidoMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealTempEq1(req, res);
})


// frequencia
router.get("/ultimasFreqEq1/:apelidoMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasFreqEq1(req, res);
});

router.get("/tempo-realFreqEq1/:apelidoMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealFreqEq1(req, res);
})

// rede
router.get("/ultimasRedeEq1/:apelidoMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasRedeEq1(req, res);
});

router.get("/tempo-realRedeEq1/:apelidoMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealRedeEq1(req, res);
})

// auxiliares
router.get("/ultimasAuxEq1/:apelidoMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasAuxEq1(req, res);
});

router.get("/tempo-realAuxEq1/:apelidoMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealAuxEq1(req, res);
})

module.exports = router;