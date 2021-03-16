const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const connection = require('./database/database.js')

const categoriesController = require("./categories/CategoriaController")
const articlesController = require("./articles/ArticlesController")

const Article = require("./articles/Article");
const Category = require("./categories/Category")

//View Engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'))

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

//DATABASE
connection  
    .authenticate()
    .then(() => {
        console.log("Conexão realizada com o banco de dados")
    }).catch((error) => {
        console.log(error)
    })

app.use("/", categoriesController);
app.use("/", articlesController)

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(8001, () => {
    console.log("Hello World")
})