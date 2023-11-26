var usuarioModel = require("../models/usuarioModel");

// Buscar por cpf
function buscarPorCpf(req, res) {
    var cpf = req.query.cpf;

    usuarioModel.buscarPorCpf(cpf).then((resultado) => {
        res.status(200).json(resultado);
    });
}

// autenticação de usuario
function autenticar(req, res) {
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;

    if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(cpf, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("cpf e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


// cadastrar usuario
function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var senha = req.body.senhaServer;
    var cpf = req.body.cpfServer;
    var telefone = req.body.telefoneServer;
    var cargo = req.body.cargoServer;
    var organizacao = req.body.organizacaoServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("Seu cargo está undefined!");
    } else if (organizacao == undefined) {
        res.status(400).send("Seu organizacao está undefined!");
    } else {

        usuarioModel.buscarPorCpf(cpf).then((resultado) => {
            if (resultado.length > 0) {
                // verifica se o usuario já existe
                res
                    .status(401)
                    .json({ mensagem: `O usuario com o cpf ${cpf} já existe` });
            } else {
                usuarioModel.cadastrar(nome, senha, cpf, telefone, cargo, organizacao).then((resultado) => {
                    res.status(201).json(resultado);
                });
            }
        });
    }
}

// Trocar senha
function renovarSenha(req, res) {
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;


    if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.buscarPorCpf(cpf).then((resultado) => {
            if (resultado.length > 0) {
                // verifica se o usuario já existe
                usuarioModel.renovarSenha(cpf, senha).then((resultado) => {
                    res.status(201).json(resultado);
                });

            } else {
                usuarioModel.renovarSenha(senha, cpf).then((resultado) => {
                    res
                        .status(401)
                        .json({ mensagem: `O usuario com o cpf ${cpf} não existe` });
                });
            }
        });
    }
}

//Funções da tela de usuario

// meotodo delete

// excluir usuario
function excluirUser(req, res) {
    // Crie uma variável que vá recuperar os valores
    var cpf = req.body.cpfServer;
    var cnpj = req.body.cnpjServer;

    if (cnpj == 'undefined') {
        return null;
    } else if (cpf == 'undefined') {
        return null;
    } else {
        usuarioModel.buscarPorChamados(cpf, cnpj).then((result) => {
            usuarioModel.buscarPorUser(cnpj).then((resultado) => {
                if (resultado.length == 1) {
                    res
                        .status(401)
                        .json({ mensagem: `É necessário ter pelo menos um integrante na organização` });

                } else if (result.length > 0) {
                    res
                        .status(401)
                        .json({ mensagem: `Não é possível excluir esse usuário, pois ele já lidou com solicitações.` });
                } else {
                    usuarioModel.excluirUser(cpf).then((resultado) => {
                        res.status(200).json(resultado);
                    });
                }
            });
        });
    }
}

// meotodo put

// atualizar dados
function updateUser(req, res) {
    // Crie uma variável que vá recuperar os valores
    var cpf = req.body.cpfServer;
    var nome = req.body.nomeServer;
    var telefone = req.body.telefoneServer;
    var senha = req.body.senhaServer;

    usuarioModel.updateUser(cpf, nome, telefone, senha).then((resultado) => {
        res.status(200).json(resultado);
    });
}

// meotodo get
function plotar_dados(req, res) {
    var cpf = req.params.cpf;

    if (cpf == 'undefined') {
        console.log("Sistema finalizado")
    } else {
        usuarioModel.plotar_dados(cpf).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res
                    .status(401)
                    .json({ mensagem: `Erro ao capturar dados` });
            }
        });
    }
}

function plotar_gerente(req, res) {
    var cnpj = req.params.cnpj;

    if (cnpj == 'undefined') {
        console.log("Sistema finalizado")
    } else {
        usuarioModel.plotar_gerente(cnpj).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res
                    .status(401)
                    .json({ mensagem: `Erro ao capturar dados` });
            }
        });
    }
}


function plotar_chamado(req, res) {
    var cpf = req.params.cpf;
    var cnpj = req.params.cnpj;

    const plotarPromise = usuarioModel.plotar_chamado(cpf, cnpj);

    if (plotarPromise && typeof plotarPromise.then === 'function') {
        plotarPromise.then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(401).json({ mensagem: `Você não tem chamados no momento` });
            }
        });
    } else {
        res.status(500).json({ mensagem: `Erro ao obter dados do chamado` });
    }
}

function buscarPorUser(req, res) {

    relatorioModel.buscarPorUser(cnpj).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function buscarPorChamados(req, res) {

    relatorioModel.buscarPorChamados(cpf, cnpj).then((resultado) => {
        res.status(200).json(resultado);
    });
}

module.exports = {
    autenticar,
    cadastrar,
    plotar_chamado,
    renovarSenha,
    buscarPorCpf,
    plotar_gerente,
    plotar_dados,
    buscarPorChamados,
    buscarPorUser,
    excluirUser,
    updateUser
}