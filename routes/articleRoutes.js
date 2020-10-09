const express = require('express');
const Article = require('../models/articleModel');
const router = express.Router();

// view all articles
router.get("/", async (req, res) => {
    try{
        const articles = await Article.find().sort({ createdAt: 'desc' });
        res.render("articles/index", { articles: articles });
    } catch(err) {
        console.log(err);    
    }
});

// view specific article according to slug
router.get("/:slug", async (req, res) => {
    try{
        const article = await Article.findOne({ slug: req.params.slug });
        res.render("articles/show", { article: article });
    } catch(err){
        if(article == null) {
            res.redirect("/");
        }
    }
});

// redirect to add new article. 
// We created this because, initially it doesn't have an "article" property, so we need to set it to an empty article, so it doesn't throw us any errors
router.get("/new", (req, res) => {
    res.render("articles/new", { article: new Article() });
});

// add a new article
router.post("/", async (req, res) => {
    let article =  new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    try{
        article = await article.save();
        res.redirect(`/articles/${article.slug}`);
    } catch(err){
        res.render('articles/new', { article : article});
    }
});

// delete an article
router.delete("/:id", async (req, res) => {
    try{
        await Article.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch(err) {
        res.send(err.message);
    }
});

module.exports = router;