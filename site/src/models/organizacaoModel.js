var database = require("../database/config");


function listar() {
  var query = `select * from tbOrganizacao`;

  return database.executar(query);
}

function buscarPorCnpj(cnpj) {
  var query = `select * from tbOrganizacao where cnpj = '${cnpj}'`;

  return database.executar(query);
}

function cadastrar(nome, cnpj) {
  var query = `insert into tbOrganizacao values ('${cnpj}', '${nome}')`;

  return database.executar(query);
}

module.exports = {buscarPorCnpj, cadastrar, listar};
