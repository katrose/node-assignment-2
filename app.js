/**
 * MODULE IMPORTS
 */
const express = require('express');
const path = require('path');
const navBar = require('./navBar');
const logForm = require('./logform');

/**
 * EXPRESS/EJS SETUP
 */
const app = express();

// Allows us to exclude the file extension
app.set('view engine', 'ejs'); 

/**
 * MIDDLEWARE
 */

// Read HTTP POST data (this needs to be placed above the POST request)
app.use(express.urlencoded({ extended: false }))

// Serve static assets. Will serve all types of files (css, images) as long as they are in the directory specified in path.join()
app.use(express.static(path.join(__dirname, 'assets')));

// Write form data to a log file. Alternatively, can add logForm as a callback parameter to the app.post() function below, but I left it here to keep all middleware functions together.
app.use('/submitform', logForm);

/**
 * ENDPOINTS
 */
app.get('/', function(request, response) {
  response.render('index', {navBar: navBar});
});

app.get('/:page', function(request, response) {
  response.render(request.params.page, {navBar: navBar}); // params.page = :page
});

/**
 * POST REQUEST
 */
app.post('/submitform', function(request, response){
  response.render('thankyou', {data: request.body, navBar: navBar});
})

/**
 * 404 HANDLER
 */
app.use(function(err, request, response, next) {
  if (err) {
    response.status(404);
    response.render('filenotfound', {navBar: navBar});
  }
});

/**
 * SERVER START
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});
