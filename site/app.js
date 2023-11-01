process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
const fs = require('fs');

var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var pdfRouter = require("./src/routes/pdf");
var indexRouter = require("./src/routes/index");
var historicoRouter = require("./src/routes/historico");
var relatorioRouter = require("./src/routes/relatorio");
var eventoRouter = require("./src/routes/eventos");
var usuarioRouter = require("./src/routes/usuarios");
var organizacaoRouter = require("./src/routes/organizacao");
var chamadasRouter = require("./src/routes/chamadas");
var medidasRouter = require("./src/routes/medidas");
var medidasEq2Router = require("./src/routes/medidasEq2");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/pdf", pdfRouter);
app.use("/index", indexRouter);
app.use("/relatorio", relatorioRouter);
app.use("/evento", eventoRouter);
app.use("/usuarios", usuarioRouter);
app.use("/organizacao", organizacaoRouter);
app.use("/chamadas", chamadasRouter);
app.use("/medidas", medidasRouter);
app.use("/medidasEq2", medidasEq2Router);
app.use("/historico", historicoRouter);

app.get('/pdfLer', function (req, res) {
    const filePath = "historico.pdf";
    fs.readFile(filePath, function (err, data) {
        res.contentType("application/pdf");
        res.send(data);
    });
});

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
