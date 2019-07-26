const express = require('express');
const app = express();
let port = process.env.PORT || 8080;

app.use('/', express.static('static'));

app.listen(port, function () {
  console.log('Example app listening on port ' + port + "!");
});

