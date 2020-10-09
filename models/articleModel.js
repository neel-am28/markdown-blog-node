const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window); // sanitise html to protect from attacks


const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    markdown:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml : {
        type: String,
        required: true
    }
});

// create slug by title
articleSchema.pre('validate', function(next){
    if(this.title){
        this.slug = slugify(this.title, { lower: true, strict: true }); //strict allows to remove any special characters like (:, ;, etc)
    }
    if(this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
        // marked(this.markdown) = converts markdown to html
        // dompurify.sanitize(marked(this.markdown)) = sanatizes html
    }
    next();
});

module.exports = mongoose.model("Article", articleSchema);

// In mongodb: blog: database, articles: collection
// In code: blog: database, Article: model