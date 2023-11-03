var express = require("express");
const fs = require('fs');
var router = express.Router();

var pdfController = require("../controllers/pdfController");

router.post("/criarPdf", function (req, res) {
    pdfController.criar(req, res);
})

router.get('/pdfLer', function (req, res) {
    pdfController.pdfLer(req, res);
});

module.exports = router;