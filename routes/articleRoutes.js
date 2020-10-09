const express = require("express");
const Article = require("../models/articleModel");
const router = express.Router();

// redirect to add new article.
// We created this because, initially it doesn't have an "article" property, so we need to set it to an empty article, so it doesn't throw us any errors
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

// edit route
router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});

// view all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: "desc" });
    res.render("articles/index", { articles: articles });
  } catch (err) {
    console.log(err);
  }
});

// view specific article according to slug
router.get("/:slug", async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    res.render("articles/show", { article: article });
  } catch (err) {
    if (article == null) {
      res.redirect("/");
    }
  }
});

// add a new article
router.post(
  "/",
  async (req, res, next) => {
    // next says to go to the next function in the list, which is (saveArticleAndRedirect)
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);

// delete an article
router.delete("/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.send(err.message);
  }
});

// edit an article
router.put("/:id", async (req, res, next) => {
    // next says to go to the next function in the list, which is (saveArticleAndRedirect)
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

// generic function for saving new article and updating it
function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (err) {
      res.render(`articles/${path}`, { article: article });
    }
  };
}

module.exports = router;
