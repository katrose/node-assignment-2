// --------------------------------------------------------
// STATIC HTML SERVER
// --------------------------------------------------------
const express = require('express');
const path = require('path');
const navBar = require('./navBar')
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs'); // Allows us to exclude the file extension

// Read HTTP POST data
app.use(express.urlencoded({ extended: false }))

// Endpoints for each view
app.get('/', function(request, response) {
  response.render('index', {navBar: navBar});
});

app.get('/:page', function(request, response) {
  response.render(request.params.page, {navBar: navBar}); // params.page = :page
});

// Middleware function to log all submitted form data
function logForm(request, response, next) {

  fs.appendFile('logs/forms.txt', JSON.stringify(request.body) + "\n", function(err) {
    if (err) {
      console.log(err)
    }
  });
  next();
}

// POST Request
// Note: Have to make sure form input tags have name attributes
app.post('/submitform', logForm, function(request, response){
  response.render('thankyou', {data: request.body, navBar: navBar});
})

// Serve static assets. Will serve all types of files (css, images) as long as they are in the public directory.
app.use(express.static(path.join(__dirname, 'assets')));

// Handle 404s
app.use(function(req, res, next) {
  res.status(404);
  res.send('404: File Not Found');
});

// Environment port (undefined) || 3000 as default
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});
