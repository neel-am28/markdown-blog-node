const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articleRoutes");
const Article = require('./models/article');
const app = express();

const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://neelam:neelam1234@markdown-blog.dlxsi.mongodb.net/blog?retryWrites=true&w=majority', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    }
);

app.set("view engine", "ejs");

app.use(urlencoded({extended: false}));

app.get("/", async (req, res) => {
    try{
        const articles = await Article.find().sort({ createdAt: 'desc' });
        res.render("articles/index", { articles: articles });
    } catch(err) {
        console.log(err);    
    }
});

app.use("/articles", articleRouter);
app.listen(port, () => console.log("Server running on port 3000"));