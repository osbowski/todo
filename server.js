const express = require('express');
const path = require('path');
const app = express();
const history = require('connect-history-api-fallback')

const staticFileMiddleware = express.static(path.join(__dirname + '/dist'))
app.use(staticFileMiddleware)

app.use(history({
    disableDotRule: true,
    verbose: true
}))
app.use(staticFileMiddleware)

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '/dist/index.html'))
  })
  
const port = process.env.PORT || 3000;
app.listen(port);