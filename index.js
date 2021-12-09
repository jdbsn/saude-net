const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser")
const flash = require("express-flash");

const connection = require("./database/database");

const pacienteController = require ("./controllers/PacienteController");
const adminController = require("./controllers/AdminController");
const profissionalController = require("./controllers/ProfissionalController");
const consultaController = require("./controllers/ConsultaController");
const vagaController = require("./controllers/VagaController");

app.use(cookieParser("k2dq98JwS"));

//Sessions
app.use(session({
	secret: "sfsn!dak", 
    cookie: {maxAge: 1000000},
    resave: false,
    saveUninitialized: true
}));

app.use(flash());    

//EJS
app.set("view engine", "ejs");

//Arquivos estáticos
app.use(express.static("public"));

//Bodyparser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Conexão com o DB
connection.authenticate().then(() => {
    console.log("BD funcionando")})
    .catch((msgErro) => {
        console.log(msgErro);
    });

app.get('/', (req, res) => {
    res.render("index")
});

app.use('/', pacienteController);
app.use('/', adminController);
app.use('/', profissionalController);
app.use('/', consultaController);
app.use('/', vagaController);

app.get("/entrar", (req, res) => {
   res.render("selecaologin") 
});

app.listen(8080, () => console.log("Servidor rodando na porta 8080."));