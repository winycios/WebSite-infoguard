CREATE DATABASE SuperVisiON;

USE SuperVisiON;


CREATE TABLE tbOrganizacao(

cnpj CHAR(14) PRIMARY KEY,
nome VARCHAR(100)
);


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

idEvento INT PRIMARY KEY IDENTITY(1,1),
fk_organizacao CHAR(14),
nome VARCHAR(100),
time1 VARCHAR(50),
time2 VARCHAR(50),
status VARCHAR(20),
FOREIGN KEY (fk_organizacao) REFERENCES tbOrganizacao(cnpj)
);
        
select * from tbComputador;


CREATE TABLE tbComputador(

idComputador INT PRIMARY KEY IDENTITY(1,1),
fk_idEvento INT,
apelidoComputador VARCHAR(50),
capMaximaCpu INT,
capMaximaGpu INT,
capMaximaDisco INT,
capMaximaRam INT,
status VARCHAR(20),
FOREIGN KEY (fk_idEvento) REFERENCES tbEvento(idEvento)
);


CREATE TABLE tbOcorrencia(

idOcorrencia INT PRIMARY KEY IDENTITY(1,1),
descricao VARCHAR(100),
fk_idComputador INT,
hora datetime2(0),
fk_cpfOperador CHAR(11),
status VARCHAR(45),
FOREIGN KEY (fk_cpfOperador) REFERENCES tbUsuario(cpf),
FOREIGN KEY (fk_idComputador) REFERENCES tbComputador(idComputador)
);


CREATE TABLE tbMonitoramento(

dataHora DATETIME2(0) PRIMARY KEY,
fk_idComputador INT,
cpuTemp INT,
cpuFreq INT,
gpuTemp INT,
gpuFreq INT,
redeLatencia INT,
disco INT,
ram INT,
FOREIGN KEY (fk_idComputador) REFERENCES tbComputador(idComputador)
);


/* criar usuario */
CREATE LOGIN superOn_datawriter_datareader WITH PASSWORD = '123';

CREATE USER superOn FOR LOGIN superOn_datawriter_datareader;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'superOn';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'superOn';