import express from 'express';
import bodyParser from 'body-parser';
import * as posts from './posts.js';  // Import all exported functions from posts.js

const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Home page route
app.get('/', (req, res) => {
    res.render('home.ejs');
});

// All posts route
app.get('/posts', (req, res) => {
    const allPosts = posts.getAll();
    res.render('posts.ejs', { posts: allPosts });
});

// Create post routes
app.get('/create', (req, res) => {
    res.render('create.ejs');
});

app.post('/create', (req, res) => {
    const { title, content } = req.body;
    posts.create(title, content);
    res.redirect('/posts');
});

// Edit post routes
app.get('/edit/:id', (req, res) => {
    const post = posts.getById(req.params.id);
    if (!post) {
        res.redirect('/posts');
        return;
    }
    res.render('edit.ejs', { post });
});

app.post('/edit/:id', (req, res) => {
    const { title, content } = req.body;
    posts.update(req.params.id, title, content);
    res.redirect('/posts');
});

// Delete post route
app.post('/delete/:id', (req, res) => {
    posts.delete(req.params.id);
    res.redirect('/posts');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});