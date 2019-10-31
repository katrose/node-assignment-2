const fs = require('fs');

// Middleware function to log all submitted form data. 
function logForm(request, response, next) {

  fs.appendFile('logs/forms.log', JSON.stringify(request.body) + "\n", function(err) {
    if (err) {
      console.log(err)
    }
  });
  next();
}
module.exports = logForm;