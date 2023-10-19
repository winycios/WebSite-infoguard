var database = require("../database/config")
var globalCnpj = null;

// buscar por cnpj
function buscarPorEvento(cnpj) {
    var query = `select idEvento from tbEvento where fk_organizacao = '${cnpj}' AND status = 'Em andamento';`;

    return database.executar(query);
}

// finalizar evento
function finalizar(confirm, cnpj) {
    return new Promise(() => {
        buscarPorEvento(cnpj).then((response) => {
            const idAtual = response[0].idEvento;
            var query = `update tbEvento set status = '${confirm}' where idEvento = ${idAtual};`;

            return setTimeout(function () {
                atualizarEquipe(cnpj);
            }, 2000), database.executar(query);
        });
    });
}

function atualizarEquipe(cnpj) {
    return new Promise(() => {
        var query = `update tbUsuario set statusServico = 'livre' where fk_organizacao = ${cnpj};`;
        return database.executar(query);
    });
}


// finalizar evento
function updateEvento(e1, e2, evento, cnpj) {
    return new Promise((resolve, reject) => {
        buscarPorEvento(cnpj)
            .then((response) => {
                const idAtual = response[0].idEvento;
                var query = `update tbEvento set time1 = "${e1}", time2 = "${e2}", nome = "${evento}"  where idEvento = ${idAtual};`;

                setTimeout(function () {
                    trocarNome1(e1, idAtual)
                    trocarNome2(e2, idAtual)
                        .then(() => {
                            database.executar(query)
                                .then(() => resolve("Evento atualizado com sucesso"))
                                .catch((error) => reject(error));
                        })
                        .catch((error) => reject(error));
                }, 1000);
            })
            .catch((error) => reject(error));
    });
}

function trocarNome1(e1, idAtual) {
    var id = idAtual;
    return new Promise((resolve, reject) => {
        database.executar(`SELECT time1 FROM tbEvento WHERE idEvento = ${id};`)
            .then((rows) => {
                const time = rows[0].time1;

                database.executar(`SELECT count(apelidoComputador) as "contador" FROM tbComputador WHERE fk_idEvento = ${id} AND apelidoComputador LIKE "%${rows[0].time1}";`)
                    .then((rows) => {
                        const timeCount = rows[0].contador;

                        const promises = [];
                        for (let index = 1; index <= timeCount; index++) {
                            promises.push(
                                database.executar(`UPDATE tbComputador SET apelidoComputador = 'PC${index}' ' ${e1}' WHERE apelidoComputador LIKE "PC${index} ${time}" ;`)
                            );
                        }
                        Promise.all(promises)
                            .then(() => resolve("Nomes trocados com sucesso"))
                            .catch((error) => reject(error));
                    })
                    .catch((error) => reject(error));
            })
            .catch((error) => reject(error));
    });
}

function trocarNome2(e2, idAtual) {
    var id = idAtual;
    return new Promise((resolve, reject) => {
        database.executar(`SELECT time2 FROM tbEvento WHERE idEvento = ${id};`)
            .then((rows) => {
                const time = rows[0].time2;

                database.executar(`SELECT count(apelidoComputador) as "contador" FROM tbComputador WHERE fk_idEvento = ${id} AND apelidoComputador LIKE "%${rows[0].time2}";`)
                    .then((rows) => {
                        const timeCount = rows[0].contador;

                        const promises = [];
                        for (let index = 1; index <= timeCount; index++) {
                            promises.push(
                                database.executar(`UPDATE tbComputador SET apelidoComputador = 'PC${index}' ' ${e2}' WHERE apelidoComputador LIKE "PC${index} ${time}" ;`)
                            );
                        }
                        Promise.all(promises)
                            .then(() => resolve("Nomes trocados com sucesso"))
                            .catch((error) => reject(error));
                    })
                    .catch((error) => reject(error));
            })
            .catch((error) => reject(error));
    });
}

// cnpj da organização
function pegarCnpj(cnpj) {
    return new Promise((resolve) => {
        globalCnpj = cnpj;
        resolve(globalCnpj);
    });
}

// cadastrar evento
function cadastrar(equipe1, equipe2, evento, qtd, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        insert into tbEvento values (null, '${cnpj}' , '${evento}', '${equipe1}', '${equipe2}', 'Em andamento');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return setTimeout(function () {
        desktop(qtd, cnpj, equipe1, equipe2);
    }, 2000), database.executar(instrucao);
}

function desktop(qtd, cnpj, equipe1, equipe2) {
    return new Promise(() => {
        database.executar(`select idEvento as 'id' from tbEvento where fk_organizacao = '${cnpj}' AND status = 'Em andamento';`)
            .then((rows) => {
                const idAtual = rows[0].id;

                // Usar Promise.all para lidar com várias promessas geradas pelo loop
                // criação dos computadores da equipe 1
                const promises = [];
                for (let index = 1; index <= qtd; index++) {
                    promises.push(
                        database.executar(`insert into tbComputador (idComputador,fk_idEvento,apelidoComputador, status) values (null, '${idAtual}' , 'PC${index}' ' ${equipe1}', 'bom');`)
                    );
                }
                // criação dos computadores da equipe 2
                for (let index = 1; index <= qtd; index++) {
                    promises.push(
                        database.executar(`insert into tbComputador (idComputador,fk_idEvento,apelidoComputador, status) values (null, '${idAtual}' , 'PC${index}' ' ${equipe2}', 'bom');`)
                    );
                }
            });
    });
}


// metodo get

/* select das equipes e nome do evento*/
function plotar_equipe() {
    if (globalCnpj == undefined) {
    } else {
        console.log("select das equipes e nome do evento");
        var instrucao = `
    select time1 as 't1', time2 as 't2', nome from tbEvento where  idEvento = (select idEvento from tbEvento where fk_organizacao = ${globalCnpj} ORDER BY idEvento DESC LIMIT 1) AND status = "Em andamento";
    `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
}

/* listar maquinas*/
function listarPCE1() {
    if (globalCnpj == undefined) {
        return Promise.reject("CNPJ não definido");
    } else {
        return new Promise((resolve, reject) => {
            database.executar(`SELECT time1 FROM tbEvento WHERE fk_organizacao = ${globalCnpj} AND status = "Em andamento";`)
                .then((rows) => {
                    if (rows.length == 0) {
                        reject("Nenhum evento em andamento encontrado");
                        return;
                    }

                    const time = rows[0].time1;
                    const query = `SELECT apelidoComputador AS 'e1' FROM tbComputador c
                        INNER JOIN tbEvento o ON c.fk_idEvento = o.idEvento
                        WHERE fk_idEvento = (SELECT idEvento FROM tbEvento WHERE fk_organizacao = ${globalCnpj} ORDER BY idEvento DESC LIMIT 1) 
                        AND o.status = "Em andamento" AND apelidoComputador LIKE  '%${time}';`;

                    return database.executar(query);
                })
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });
    }
}


function listarPCE2() {
    if (globalCnpj == undefined) {
    } else {
        return new Promise((resolve, reject) => {
            database.executar(`select time2 from tbEvento where fk_organizacao = ${globalCnpj} AND status = "Em andamento";`)
                .then((rows) => {
                    if (rows.length == 0) {
                        reject("Nenhum evento em andamento encontrado");
                        return;
                    }
                    const time = rows[0].time2;
                    var query = `select apelidoComputador as 'e2' from tbComputador c
            inner join tbEvento o ON c.fk_idEvento = o.idEvento
            where fk_idEvento = (select idEvento from tbEvento where fk_organizacao = ${globalCnpj} ORDER BY idEvento DESC LIMIT 1) 
            AND o.status = "Em andamento" AND apelidoComputador LIKE '%${time}';`;

                    return database.executar(query);
                })
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });
    }
}



module.exports = {
    cadastrar,
    buscarPorEvento,
    plotar_equipe,
    finalizar,
    listarPCE2,
    listarPCE1,
    updateEvento,
    pegarCnpj
};