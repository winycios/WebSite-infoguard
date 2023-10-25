var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidasEq2Controller");


//equipe 2
// temperatura
router.get("/ultimasTempEq2/:apelidoMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasTempEq2(req, res);
});

router.get("/tempo-realTempEq2/:apelidoMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealTempEq2(req, res);
})


// frequencia
router.get("/ultimasFreqEq2/:apelidoMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasFreqEq2(req, res);
});

router.get("/tempo-realFreqEq2/:apelidoMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealFreqEq2(req, res);
})

// rede
router.get("/ultimasRedeEq2/:apelidoMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasRedeEq2(req, res);
});

router.get("/tempo-realRedeEq2/:apelidoMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealRedeEq2(req, res);
})

// auxiliares
router.get("/ultimasAuxEq2/:apelidoMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasAuxEq2(req, res);
});

router.get("/tempo-realAuxEq2/:apelidoMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealAuxEq2(req, res);
})

module.exports = router;