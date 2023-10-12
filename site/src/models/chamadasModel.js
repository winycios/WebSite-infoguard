var database = require("../database/config")

function listarChamados(idOcorrencia){

    if(idOcorrencia == undefined){
        var query = `select descricao, hora, status from tbOcorrencia;`
        return database.executar(query);
    
    }else{
        var query2 = `update tbOcorrencia SET fk_cpfOperador, status where idOcorrencia;`
        return database.executar(query2);
        
    }   
}

module.exports = {
    listarChamados
}