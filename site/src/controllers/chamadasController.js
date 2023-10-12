var chamadasModel = require("../models/chamadasModel");


function listarChamados(req, res) {

  var idOcorrencia = req.body.idOcorrenciaServer;
  
    chamadasModel.listarChamados(idOcorrencia).then((resultado) => {
      res.status(200).json(resultado);
    });

  }


  module.exports = {
    listarChamados
  }
  