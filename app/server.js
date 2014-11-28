var app, express, logger, serveIndex, serveStatic, server;

express = require('express');

serveStatic = require('serve-static');

serveIndex = require('serve-index');

logger = require('morgan');

app = express();

app.use(logger());

app.use("/_", serveStatic("" + __dirname + "/public", {
  index: false
}));

app.use(serveIndex("" + __dirname + "/filebase", {
  icons: false,
  dotfiles: 'deny',
  template: "" + __dirname + "/template.html"
}));

app.use(serveStatic("" + __dirname + "/filebase"));

server = app.listen(8080, function() {
  var host, port;
  host = server.address().address;
  port = server.address().port;
  return console.log("App listening at http://%s:%s", host, port);
});
