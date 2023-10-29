var express = require("express");
var router = express.Router();

var pdfController = require("../controllers/pdfController");

router.post("/criarPdf", function (req, res) {
    pdfController.criar(req, res);
})

module.exports = router;