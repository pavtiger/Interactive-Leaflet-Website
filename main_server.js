const http = require("http");
const urlapi = require("url");
const fs = require("fs");
const path = require("path");
const nStatic = require("node-static");

const filePath = path.join(__dirname, "lib/leaflet.html");
var allFileServer = new nStatic.Server(path.join(__dirname, "/"));



function index(req, res) {
    fs.readFile(filePath, {encoding: "utf-8"}, function(err, data) {
        if (!err) {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data);
        } else {
            console.log(err);
        }
    });
}


function error404(req, res) {
    res.writeHead(404, {"Content-Type": "text/html"});
    res.end("404 Not Found :(");
}



function main(req, res) {
    var url = urlapi.parse(req.url);
    var pathname = url.pathname;

    switch(true) {
        case pathname === "/":
            index(req, res);
            break;

        case pathname.startsWith("/"):
            allFileServer.serve(req, res);
            break;

        default:
            error404(req, res);
            break;
    }
}

var app = http.createServer(main);
app.listen(8080);
console.log("Listening on 8080");
