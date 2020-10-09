const express = require('express');
const article = require('../models/article');
const Article = require('../models/article');
const router = express.Router();

router.get("/new", (req, res) => {
    res.render("articles/new", { article: new Article() });
});

router.get("/:id", async (req, res) => {
    try{
        const article = await Article.findById(req.params.id);
        res.render("articles/show", { article: article });
    } catch(err){
        if(article == null) {
            res.redirect("/");
        }
    }
});

router.post("/", async (req, res) => {
    let article =  new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    try{
        article = await article.save();
        res.redirect(`/articles/${article.id}`);
    } catch(err){
        res.render('articles/new', { article : article});
    }
});


module.exports = router;