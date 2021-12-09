CREATE TABLE admin (

id INT NOT NULL AUTO_INCREMENT,
nome VARCHAR(60) NOT NULL,
email VARCHAR(50) NOT NULL,
senha VARCHAR(255) NOT NULL,
PRIMARY KEY (id)

);

CREATE TABLE paciente (

id INT NOT NULL AUTO_INCREMENT,
nome VARCHAR(60) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL,
cpf VARCHAR(14) NOT NULL UNIQUE,
data_nascimento DATE NOT NULL,
genero VARCHAR(9) NOT NULL,
telefone VARCHAR(15) NOT NULL,
rua VARCHAR(40) NOT NULL,
bairro VARCHAR(30) NOT NULL,
cep VARCHAR(9) NOT NULL,
cidade VARCHAR(35) NOT NULL,
estado VARCHAR(2) NOT NULL,
CONSTRAINT paciente_pk PRIMARY KEY (id)

);

CREATE TABLE profissional (

id INT NOT NULL AUTO_INCREMENT,
nome VARCHAR(60) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL,
cpf VARCHAR(14) NOT NULL UNIQUE,
data_nascimento DATE NOT NULL,
genero VARCHAR(9) NOT NULL,
telefone VARCHAR(15) NOT NULL,
rua VARCHAR(40) NOT NULL,
bairro VARCHAR(30) NOT NULL,
cep VARCHAR(9) NOT NULL,
cidade VARCHAR(35) NOT NULL,
estado VARCHAR(2) NOT NULL,
tipo VARCHAR(15) NOT NULL,
especialidade VARCHAR(40) NOT NULL,
numero_conselho VARCHAR(20) NOT NULL,
CONSTRAINT profissional_pk PRIMARY KEY (id)

);

CREATE TABLE consulta (

id INT NOT NULL AUTO_INCREMENT,
data DATE NOT NULL,
hora_inicio VARCHAR(5) NOT NULL,
hora_fim VARCHAR(5) NOT NULL,
anotacoes VARCHAR(255),
idProfissional INT NOT NULL,
idPaciente INT NOT NULL,
status ENUM('finalizado', 'agendado', 'cancelado') NOT NULL,
CONSTRAINT consulta_pk PRIMARY KEY (id),
FOREIGN KEY (idProfissional) REFERENCES profissional(id),
FOREIGN KEY (idPaciente) REFERENCES paciente(id)

);

CREATE TABLE vaga (

id INT NOT NULL AUTO_INCREMENT,
data DATE NOT NULL,
hora_inicio VARCHAR(5) NOT NULL,
hora_fim VARCHAR(5) NOT NULL,
intervalo INT NOT NULL,
idProfissional INT NOT NULL,
CONSTRAINT vaga_pk PRIMARY KEY (id),
FOREIGN KEY (idProfissional) REFERENCES profissional(id)

);

CREATE TABLE plano_saude (

id INT NOT NULL AUTO_INCREMENT,
nome VARCHAR(40) NOT NULL,
CONSTRAINT plano_saude_pk PRIMARY KEY (id)

);

CREATE TABLE plano_aceito (

idPlanoSaude INT NOT NULL,
idProfissional INT NOT NULL,
FOREIGN KEY (idPlanoSaude) REFERENCES plano_saude(id),
FOREIGN KEY (idProfissional) REFERENCES profissional(id)

);

CREATE TABLE token_paciente (

id INT NOT NULL AUTO_INCREMENT,
token VARCHAR(50) NOT NULL,
expiracao DATETIME NOT NULL,
idPaciente INT NOT NULL,
CONSTRAINT token_paciente_pk PRIMARY KEY (id),
FOREIGN KEY (idPaciente) REFERENCES paciente(id)

);

CREATE TABLE token_profissional (

id INT NOT NULL AUTO_INCREMENT,
token VARCHAR(50) NOT NULL,
expiracao DATETIME NOT NULL,
idProfissional INT NOT NULL,
CONSTRAINT token_profissional_pk PRIMARY KEY (id),
FOREIGN KEY (idProfissional) REFERENCES profissional(id)

);