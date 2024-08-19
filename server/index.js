// const express = require("express")
const https = require("https")
const http = require("http")
const path = require("path")
const fs = require("fs")
const express = require("express")
const process = require("process")

process.title = "js.tracrypto";

app = express()

const options = {
    key: fs.readFileSync("secure.key"),
    cert: fs.readFileSync("secure.cert"),
}

app.use(express.static('dist'));
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '../dist/index.html'), {}, err => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  }).listen(6000);

https.createServer(options, app).listen(6001)
