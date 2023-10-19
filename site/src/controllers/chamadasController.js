var chamadasModel = require("../models/chamadasModel");

// pegar cnpj
function pegarCnpj(req, res) {
    var cnpj = req.body.cnpjServer;

    chamadasModel.pegarCnpj(cnpj).then((resultado) => {
        res.status(201).json(resultado);
    });
}

// saber se o usuario está disponivel ou não
function buscarPorUser(req, res) {

    chamadasModel.buscarPorUser(cpf).then((resultado) => {
        res.status(200).json(resultado);
    });
}

// update -> Em andamento 
function updatePendente(req, res) {
    // Crie uma variável que vá recuperar os valores
    var id = req.body.idServer;
    var operador = req.body.operadorServer;

    chamadasModel.buscarPorUser(operador).then((resultado) => {
        if (resultado.length > 0) {
            chamadasModel.updatePendente(id, operador).then((resultado) => {
                res.status(200).json(resultado);
            });
        } else {
            res
                .status(401)
                .json({ mensagem: `Operador escolhido está ocupado` });
        }
    });
}

function finalizarChamado(req, res) {
    // Crie uma variável que vá recuperar os valores
    var id = req.body.idServer;
    var operador = req.body.operadorServer;

    chamadasModel.finalizarChamado(id, operador).then((resultado) => {
        res.status(200).json(resultado);
    });

}
// metodos get

// listar operadores
function listarOperadores(req, res) {

    chamadasModel.listarOperadores().then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res
                .status(401)
                .json({ mensagem: `Nenhum chamado feito` });
        }
    })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ mensagem: 'Nenhum chamado feito' });
        });
}

//Listar chamados
function listarChamados(req, res) {
    const chamadosPromise = chamadasModel.listarChamados();

    if (chamadosPromise && typeof chamadosPromise.then === 'function') {
        chamadosPromise
            .then((resultado) => {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(401).json({ mensagem: `Nenhum chamado feito` });
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ mensagem: 'Erro ao obter chamados, por favor recarregue a pagina' });
            });
    } else {
        res.status(500).json({ mensagem: 'Erro ao obter chamados' });
    }
}



module.exports = {
    listarChamados,
    pegarCnpj,
    updatePendente,
    buscarPorUser,
    finalizarChamado,
    listarOperadores
}
