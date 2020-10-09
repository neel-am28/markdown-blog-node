const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const articleRouter = require("./routes/articleRoutes");
const Article = require('./models/articleModel');
const app = express();

const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://neelam:neelam1234@markdown-blog.dlxsi.mongodb.net/blog?retryWrites=true&w=majority', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
    }
);

app.set("view engine", "ejs");
app.use(urlencoded({extended: false}));

let publicDir = require('path').join(__dirname, '/public');
// console.log(publicDir);
app.use(express.static(publicDir));



app.use(methodOverride('_method'));

app.use("/articles", articleRouter);

app.get("/", (req, res) => {
    res.redirect("/articles");
});

app.listen(port, () => console.log("Server running on port 3000"));