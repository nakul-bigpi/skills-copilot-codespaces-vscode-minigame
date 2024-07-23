// Create web server and listen on port 3000
// Import express module
const express = require('express');
// Create express application
const app = express();
// Import file system module
const fs = require('fs');
// Import body parser module
const bodyParser = require('body-parser');
// Set the view engine to ejs
app.set('view engine', 'ejs');
// Use body parser
app.use(bodyParser.urlencoded({ extended: false }));
// Use static files
app.use(express.static('public'));
// Read comments.json file
let comments = JSON.parse(fs.readFileSync('comments.json'));
// Render comments page
app.get('/comments', (req, res) => {
    res.render('comments', {
        comments: comments
    });
});
// Add a new comment
app.post('/comments', (req, res) => {
    comments.push({
        name: req.body.name,
        comment: req.body.comment
    });
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.redirect('/comments');
});
// Listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
