const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const connection = require('./database/database.js')
const session = require("express-session");
const categoriesController = require("./categories/CategoriaController")
const articlesController = require("./articles/ArticlesController")
const usersControllers = require("./users/UsersController")

const Article = require("./articles/Article");
const Category = require("./categories/Category")
const Users = require("./users/Users");
//View Engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'))

//Sessions
app.use(session({
    secret: "IgktCUnwJwvG",
    cookie: {maxAge: 30000}
}))

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
app.use("/", usersControllers)

app.get("/", (req, res) => {
    Article.findAll({
        order:[
            ['id', 'DESC']
        ],
        limit: 5
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories})
        })
    })
})

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories})
            })
        }else{
            res.redirect("/")
        }        
    }).catch(() => {
        res.redirect("/")
    })
})

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if (category != undefined) {
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories})
            })
        }else{
            res.redirect("/")
        }
    }).catch(() => {
        res.redirect("/")
    })
})

app.listen(8001, () => {
    console.log("Hello World")
})