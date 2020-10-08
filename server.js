const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articleRoutes");
const app = express();

const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://neelam:neelam1234@markdown-blog.dlxsi.mongodb.net/blog?retryWrites=true&w=majority', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true })
        .then((result) => app.listen(port, () => console.log("Server running on port 3000")))
        .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(urlencoded({extended: false}));

app.get("/", (req, res) => {
    const articles = [
    {
        title: "Hello World",
        description: "Test description",
        createdAt: new Date()
    },
    {
        title: "Hello World 2",
        description: "Test description 2",
        createdAt: new Date()
    }
];
    res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);
