const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const connection = require('./database/database.js')
//View Engine
app.set('view engine', 'ejs');

//Static
app.set(express.static("public"))

//Body parser
app.use(bodyParser.urlencoded({extendeds: false}));
app.use(bodyParser.json())

//DATABASE
connection  
    .authenticate()
    .then(() => {
        console.log("Conexão realizada com o banco de dados")
    }).catch((error) => {
        console.log(error)
    })

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(8001, () => {
    console.log("Hello World")
})