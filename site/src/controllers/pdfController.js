var pdfModel = require("../models/pdfModel");
const pdf = require("html-pdf");

function pegarDadosEvento(req, res) {
    pdfModel.pegarDadosEvento(cnpj).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function pegarDadosComputador(req, res) {
    pdfModel.pegarDadosComputador(cnpj).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function pegarDadosOcorrencia(req, res) {
    pdfModel.pegarDadosOcorrencia(cnpj).then((resultado) => {
        res.status(200).json(resultado);
    });
}


function pegarDadosOperador(req, res) {
    pdfModel.pegarDadosOperador(cnpj).then((resultado) => {
        res.status(200).json(resultado);
    });
}


function criar(req, res) {
    const cnpj = req.body.cnpjServer;

    pdfModel.pegarDadosOperador(cnpj).then((resultadoOperador) => {
        pdfModel.pegarDadosOcorrencia(cnpj).then((resultadoOcorrencia) => {
            pdfModel.pegarDadosEvento(cnpj).then((resultado) => {
                pdfModel.pegarDadosComputador(cnpj).then((resultadoPc) => {
                    if (resultado.length > 0) {
                        var org = "";
                        var eventos = "";
                        var ocorrencia = "";
                        var Contagemocorrencia = "";
                        var ContagemOperador = "";

                        // Pegar dados do evento
                        resultado.forEach((dd) => {
                            org = dd.org;

                            eventos += `
                        <tr>
                            <td>${dd.idEvento}</td>
                            <td>${dd.nome}</td>
                            <td>${dd.status}</td>
                            <td>${dd.time1}</td>
                            <td>${dd.time2}</td>
                        </tr>`;
                        });

                        // pegar quantidade ocorrencia
                        resultadoOcorrencia.forEach((dd) => {

                            Contagemocorrencia += `
                        <tr>
                            <td>${dd.nomeEvento}</td>
                            <td>${dd.apelidoComputador}</td>
                            <td>${dd.ocorrencia}</td>

                        </tr>`;
                        });

                        // pegar quantidade de operadores
                        resultadoOperador.forEach((dd) => {

                            ContagemOperador += `
                        <tr>
                            <td>${dd.nome}</td>
                            <td>${dd.contagem}</td>
                            <td>${dd.cargo}</td>
                        </tr>`;
                        });

                        // Pegar dados do computador e da ocorrência
                        resultadoPc.forEach((dd) => {
                            const dataAtual = new Date(dd.hora);
                            const opcoesDeFormato = {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                                hour12: false // Usar formato de 24 horas 
                            };
                            const dataFormatada = dataAtual.toLocaleDateString('pt-BR', opcoesDeFormato);

                            ocorrencia += `
                        <tr>
                            <td>${dd.idEvento}</td>
                            <td>${dd.nomeEvento}</td>
                            <td>${dd.apelidoComputador}</td>
                            <td>${dd.operador}</td>
                            <td>${dd.descricao}</td>
                            <td>${dataFormatada}</td>
                        </tr>`;
                        });


                        const conteudo = `
                        <html>

                        <head>
                            <style>
                                h1 {
                                    font-size: 30px;
                                    color: black;
                                    text-transform: uppercase;
                                    font-weight: 300;
                                    text-align: center;
                                    margin-bottom: 15px;
                                }
                        
                                section {
                                    margin: 50px;
                                }
                        
                                table {
                                    color: black;
                                    width: 100%;
                                    table-layout: fixed;
                                }
                        
                                .table1 {
                                    width: 45%;
                        
                                }
                        
                                .table2 {
                                    width: 45%;
                                    margin-left: 42.5%;
                                    margin-top: -20.4%;
                                    position: absolute;
                                }
                        
                                .tbl-header {
                                    background-color: rgba(0, 0, 0, 0.3);
                                }
                        
                                .tbl-content {
                                    margin-top: 0px;
                                    border: 1px solid rgba(0, 0, 0, 0.3);
                                }
                        
                                th {
                                    padding: 20px 15px;
                                    text-align: center;
                                    font-weight: 500;
                                    font-size: 12px;
                                    color: black;
                                    text-transform: uppercase;
                                }
                        
                                td {
                                    text-align: center;
                                    color: black;
                                    padding: 15px;
                                    vertical-align: middle;
                                    font-weight: 300;
                                    font-size: 12px;
                                    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
                                }
                            </style>
                        </head>
                        
                        <body>
                            <section>
                                <h1>Relatório da ${org}</h1>
                                <hr>
                                <p>Primeiramente iremos listar todos os eventos</p>
                                <div class="tbl-header">
                                    <table cellpadding="0" cellspacing="0" border="0">
                                        <thead>
                                            <tr>
                                                <th>Id do evento</th>
                                                <th>Evento</th>
                                                <th>Status</th>
                                                <th>Equipe 1</th>
                                                <th>Equipe 2</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div class="tbl-content">
                                    <table cellpadding="0" cellspacing="0" border="0">
                                        <tbody>
                                            <tr>${eventos}</tr>
                                        </tbody>
                                    </table>
                                </div>
                        
                                <hr>
                                <p>Computadores e principais ocorrências</p>
                                <div class="tbl-header">
                                    <table cellpadding="0" cellspacing="0" border="0">
                                        <thead>
                                            <tr>
                                                <th>Id do evento</th>
                                                <th>Evento</th>
                                                <th>Apelido computador</th>
                                                <th>Operador</th>
                                                <th>descrição</th>
                                                <th>hora</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div class="tbl-content">
                                    <table cellpadding="0" cellspacing="0" border="0">
                                        <tbody>
                                            <tr>${ocorrencia}</tr>
                                        </tbody>
                                    </table>
                                </div>
                        
                                <p>Quantidade de chamados por máquina</p>
                                <div class="">
                                    <div class="tbl-header">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <thead>
                                                <tr>
                                                    <th>Evento</th>
                                                    <th>Computador</th>
                                                    <th>ocorrências</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                    <div class="tbl-content">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tbody>
                                                <tr>${Contagemocorrencia}</tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                        
                        <br><br>
                                <div class="">
                                    <p>Quantidade de chamados atendidos</p>
                                    <div class="tbl-header">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <thead>
                                                <tr>
                                                    <th>Funcionários</th>
                                                    <th>Chamados</th>
                                                    <th>Cargo</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                    <div class="tbl-content">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tbody>
                                                <tr>${ContagemOperador}</tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        </body>
                        
                        </html>
                `;

                        pdf.create(conteudo).toFile(`historico(${org}).pdf`, (err, result) => {
                            if (err) {
                                console.log("Um erro aconteceu", err);
                                res.status(500).send("Erro ao criar PDF");
                            } else {
                                console.log(result);
                                res.status(200).send("PDF criado com sucesso");
                            }
                        });
                    } else {
                        res.status(404).send("Nenhum dado encontrado para o CNPJ fornecido");
                    }
                });
            });
        });
    });
}

module.exports = {
    criar,
    pegarDadosEvento,
    pegarDadosComputador,
    pegarDadosOcorrencia,
    pegarDadosOperador
};
