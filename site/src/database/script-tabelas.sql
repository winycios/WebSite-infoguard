	-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
CREATE DATABASE SuperVisiON;

USE SuperVisiON;

CREATE TABLE tbOrganizacao(

cnpj CHAR(14) PRIMARY KEY,
nome VARCHAR(100)
);

select * from tbComputador;
SELECT idComputador FROM tbComputador WHERE apelidoComputador = 'PC1 loud' AND fk_idEvento = (SELECT idEvento FROM tbEvento WHERE status = 'Em andamento');
CREATE TABLE tbUsuario(

cpf CHAR(11) PRIMARY KEY ,
fk_organizacao CHAR(14),
nome VARCHAR(100),
senha VARCHAR(20),
telefone CHAR(11),
cargo VARCHAR(50),
statusServico VARCHAR(45),
FOREIGN KEY (fk_organizacao) REFERENCES tbOrganizacao(cnpj)
);

CREATE TABLE tbEvento(

idEvento INT PRIMARY KEY AUTO_INCREMENT,
fk_organizacao CHAR(14),
nome VARCHAR(100),
time1 VARCHAR(50),
time2 VARCHAR(50),
status VARCHAR(20),
FOREIGN KEY (fk_organizacao) REFERENCES tbOrganizacao(cnpj)
);
                
CREATE TABLE tbComputador(

idComputador INT PRIMARY KEY AUTO_INCREMENT,
fk_idEvento INT,
apelidoComputador VARCHAR(50),
capMaximaCpu INT,
capMaximaGpu INT,
capMaximaDisco INT,
capMaximaRam INT,
FOREIGN KEY (fk_idEvento) REFERENCES tbEvento(idEvento)
);

CREATE TABLE tbOcorrencia(

idOcorrencia INT PRIMARY KEY AUTO_INCREMENT,
descricao VARCHAR(100),
fk_idComputador INT,
hora datetime,
fk_cpfOperador CHAR(11),
status VARCHAR(45),
FOREIGN KEY (fk_cpfOperador) REFERENCES tbUsuario(cpf),
FOREIGN KEY (fk_idComputador) REFERENCES tbComputador(idComputador)
);



CREATE TABLE tbMonitoramento(

dataHora DATETIME PRIMARY KEY,
fk_idComputador INT,
cpuTemp INT,
cpuFreq INT,
gpuTemp INT,
gpuFreq INT,
redeLatencia INT,
redePacote INT,
disco INT,
ram INT,
FOREIGN KEY (fk_idComputador) REFERENCES tbComputador(idComputador)
);


/* dados do monitoramento*/
INSERT INTO tbMonitoramento (dataHora, cpuTemp, cpuFreq, gpuTemp, gpuFreq, redeLatencia, redePacote)
VALUES ('2023-09-16 11:05:00', 30, 20, 25, 10, 20, 1);

INSERT INTO tbMonitoramento (dataHora, cpuTemp, cpuFreq, gpuTemp, gpuFreq, redeLatencia, redePacote)
VALUES
    ('2023-09-16 11:10:00', 64, 68, 50,  69, 40, 1);
    
INSERT INTO tbMonitoramento (dataHora, cpuTemp, cpuFreq, gpuTemp, gpuFreq, redeLatencia, redePacote)
VALUES
   ('2023-09-16 11:15:00', 80, 90, 100,  10, 200, 1);

create user 'superOn'@'localhost' identified by '123';
grant all privileges on SuperVisiON.* to 'superOn'@'localhost';
flush privileges;
