var express = require("express");
var router = express.Router();

var indexController = require("../controllers/indexController");


router.post("/pegarCnpj", function (req, res) {
    indexController.pegarCnpj(req, res);
});



// metodos get

// temperatura
router.get("/medidaTemp", function (req, res) {
    indexController.buscarUltimasMedidasTemp(req, res);
});

router.get("/tempo-realTemp", function (req, res) {
    indexController.buscarMedidasEmTempoRealTemp(req, res);
})

// Ocouencia
router.get("/medidaFreq", function (req, res) {
    indexController.buscarUltimasMedidasFreq(req, res);
});

router.get("/tempo-realFreq", function (req, res) {
    indexController.buscarMedidasEmTempoRealFreq(req, res);
})

// rede
router.get("/medidaRede", function (req, res) {
    indexController.buscarUltimasMedidasRede(req, res);
});

router.get("/tempo-realRede", function (req, res) {
    indexController.buscarMedidasEmTempoRealRede(req, res);
})

// ocorrencia
router.get("/medidaOco", function (req, res) {
    indexController.buscarUltimasMedidasOco(req, res);
});

router.get("/tempo-realOco", function (req, res) {
    indexController.buscarMedidasEmTempoRealOco(req, res);
})


// plotar chamado
router.get("/plotar_chamado", function (req, res) {
    indexController.plotar_chamado(req, res);
});

// plotar evento
router.get("/plotar_evento", function (req, res) {
    indexController.plotar_evento(req, res);
});

module.exports = router;