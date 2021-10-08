const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const app = express();
const history = require('connect-history-api-fallback')

app.use(history({
    disableDotRule: true,
    verbose: true
}))
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 3000;
app.listen(port);