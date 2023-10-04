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

            return database.executar(query);
        });
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
        desktop(qtd, cnpj);
    }, 2000), database.executar(instrucao);
}

function desktop(qtd, cnpj) {
    return new Promise(() => {
        database.executar(`select idEvento as 'id' from tbEvento where fk_organizacao = '${cnpj}' AND status = 'Em andamento';`)
            .then((rows) => {
                const idAtual = rows[0].id;

                // Usar Promise.all para lidar com várias promessas geradas pelo loop
                // criação dos computadores da equipe 1
                const promises = [];
                for (let index = 1; index <= qtd; index++) {
                    promises.push(
                        database.executar(`insert into tbComputadores (idComputador,fk_idEvento,apelidoComputador) values (null, '${idAtual}' , 'PC${index} E1');`)
                    );
                }
                // criação dos computadores da equipe 2
                for (let index = 1; index <= qtd; index++) {
                    promises.push(
                        database.executar(`insert into tbComputadores (idComputador,fk_idEvento,apelidoComputador) values (null, '${idAtual}' , 'PC${index} E2');`)
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
    } else {
        var query = `select apelidoComputador as 'e1' from tbComputadores c
        inner join tbEvento o ON c.fk_idEvento = o.idEvento
        where fk_idEvento = (select idEvento from tbEvento where fk_organizacao = ${globalCnpj} ORDER BY idEvento DESC LIMIT 1) 
        AND o.status = "Em andamento" AND apelidoComputador LIKE '%1';`;


        return database.executar(query);
    }
}

function listarPCE2() {
    if (globalCnpj == undefined) {
    } else {
        var query = `select apelidoComputador as 'e2' from tbComputadores c
        inner join tbEvento o ON c.fk_idEvento = o.idEvento
        where fk_idEvento = (select idEvento from tbEvento where fk_organizacao = ${globalCnpj} ORDER BY idEvento DESC LIMIT 1) 
        AND o.status = "Em andamento" AND apelidoComputador LIKE '%2';`;

        // Retorna uma Promise que resolve com o resultado da execução do query
        return database.executar(query);
    }
}



module.exports = {
    cadastrar,
    buscarPorEvento,
    plotar_equipe,
    finalizar,
    listarPCE2,
    listarPCE1,
    pegarCnpj
};