// --------------------------------------------------------
// STATIC HTML SERVER
// --------------------------------------------------------

const express = require('express');
const path = require('path');
const navBar = require('./navBar')

const app = express();

app.set('view engine', 'ejs'); // Allows us to exclude the file extension

// Endpoints for each view
app.get('/', function(request, response) {
  response.render('index', navBar);
});

app.get('/:page', function(request, response) {
  response.render(request.params.page, navBar); // params.page = :page
});

// express.static (middleware): Serve static assets. Will "automatically" serve all types of files (css, images) as long as they are in the public directory.
app.use(express.static(path.join(__dirname, 'assets')));

// Environment port (undefined) || 3000 as default
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});
