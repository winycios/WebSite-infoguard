var database = require("../database/config")

var globalCnpj = null;


// cnpj da organização
function pegarCnpj(cnpj) {
    return new Promise((resolve) => {
        globalCnpj = cnpj;
        resolve(globalCnpj);
    });
}

// Atualizar chamado
function updatePendente(id, operador) {

    var query = `update tbOcorrencia set status = "Em andamento", fk_cpfOperador = ${operador} where idOcorrencia = ${id};`;

    return new Promise((resolve, reject) => {
        database.executar(query)
            .then(() => {
                setTimeout(() => {
                    statusPcAndamento(id)
                        .then(() => statusOcupado(operador))
                        .then(() => resolve())
                        .catch(error => reject(error));
                }, 2000);
            })
            .catch(error => reject(error));
    });
}
function statusOcupado(operador) {
    return new Promise(() => {
        var query = `update tbUsuario set statusServico = "ocupado" where cpf = ${operador};`
        return database.executar(query);
    });
}
async function statusPcAndamento(id) {

    try {
        const rows = await database.executar(
            `SELECT fk_idComputador FROM tbOcorrencia WHERE idOcorrencia = ${id};`
        );
        const idAtual = rows[0].fk_idComputador;
        const query = `UPDATE tbComputador SET status = 'andamento' WHERE idComputador = ${idAtual};`;
        return await database.executar(query);
    } catch (error) {
        return console.error(error);
    }
}


// finalizar chamado
function finalizarChamado(id, operador) {
    const query = `UPDATE tbOcorrencia SET status = "Finalizado", fk_cpfOperador = ${operador} WHERE idOcorrencia = ${id};`;

    return new Promise((resolve, reject) => {
        database.executar(query)
            .then(() => {
                setTimeout(() => {
                    statusLivre(operador)
                        .then(() => statusPcFinal(id))
                        .then(() => resolve())
                        .catch(error => reject(error));
                }, 1000);
            })
            .catch(error => reject(error));
    });
}

function statusLivre(operador) {
    const query = `UPDATE tbUsuario SET statusServico = "livre" WHERE cpf = ${operador};`;
    return database.executar(query);
}

function statusPcFinal(id) {
    return database.executar(
        `SELECT fk_idComputador FROM tbOcorrencia WHERE idOcorrencia = ${id};`
    )
        .then(rows => {
            const idAtual = rows[0].fk_idComputador;
            const updateQuery = `UPDATE tbComputador SET status = 'bom' WHERE idComputador = ${idAtual};`;
            return database.executar(updateQuery);
        })
        .catch(error => console.error(error));
}



// buscar usuarios de uma organização
function buscarPorUser(cpf) {
    if (globalCnpj == undefined) {
    } else {
        var query = `select cpf from tbUsuario where cpf = ${cpf} AND statusServico = 'livre'`;

        return database.executar(query);
    }
}

/* select */

function listarChamados() {
    console.log("select dos chamados");

    return new Promise((resolve, reject) => {
        if (globalCnpj === undefined) {
            reject(new Error("CNPJ não definido"));
        } else {
            var instrucao = `
                SELECT o.idOcorrencia, c.apelidoComputador, o.descricao, o.hora, o.status, u.nome, u.cpf 
                FROM tbcomputador c
                INNER JOIN tbOcorrencia o ON o.fk_idComputador = c.idComputador
                LEFT JOIN tbUsuario u ON u.cpf = o.fk_cpfOperador 
                WHERE c.fk_idEvento = (SELECT idEvento FROM tbEvento WHERE fk_organizacao = ${globalCnpj} AND status = "Em andamento");
            `;

            console.log("Executando a instrução SQL: \n" + instrucao);

            database.executar(instrucao)
                .then(resultado => {
                    resolve(resultado);
                })
                .catch(error => {
                    reject(error);
                });
        }
    });
}


// listar operadores
function listarOperadores() {
    if (globalCnpj == undefined) {
    } else {
        console.log("select dos operadores");

        var instrucao = `
        select cpf, nome as 'operador' from tbUsuario where fk_organizacao = ${globalCnpj};
    `;
        console.log("Executando a instrução SQL: \n" + instrucao);

        return database.executar(instrucao);
    }
}


module.exports = {
    listarChamados,
    listarOperadores,
    pegarCnpj,
    updatePendente,
    buscarPorUser,
    finalizarChamado
}