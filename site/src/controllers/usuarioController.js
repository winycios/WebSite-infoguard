var usuarioModel = require("../models/usuarioModel");


// pegar cnpj
function pegarCnpj(req, res) {
    var cnpj = req.body.cnpjServer;

    usuarioModel.pegarCnpj(cnpj).then((resultado) => {
        res.status(201).json(resultado);
    });
}

// pegar cpf
function pegarCpf(req, res) {
    var cpf = req.body.cpfServer;

    usuarioModel.pegarCpf(cpf).then((resultado) => {
        res.status(201).json(resultado);
    });
}

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

function trazerLider(req, res) {
    usuarioModel.trazerLider().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    });
}  

function trazerUsuario(req, res) {
    var cpf = req.params.cpfUser;
     usuarioModel.trazerUsuario(cpf).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    });
} 

function alterarNome(req, res) {
    // Crie uma variável que vá recuperar os valores
    var cpf = req.params.cpfUser;
    var altNome = req.body.alterarNomeServer;
    var altTelefone = req.body.alterarTelefoneServer;

    relatorioModel.alterarNome(altNome, altTelefone, cpf).then((resultado) => {
        res.status(200).json(resultado);
    });
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

module.exports = {
    autenticar,
    cadastrar,
    renovarSenha,
    buscarPorCpf,
    trazerLider,
    trazerUsuario,
    pegarCnpj,
    pegarCpf,
    alterarNome
}