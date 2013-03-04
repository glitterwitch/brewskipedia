#!/usr/bin/env node

var exec = require('child_process').exec;
var static = require('node-static')

function log(err, stdout, stderr) {
  console.log('log', arguments);
  if (err) console.log(err)
  if (stdout) console.log(stdout)
  if (stderr) console.log(stderr)
}

exec('./node_modules/mason/bin/mason watch -j debug', log);
console.log('Watching mason in debug mode')

var fileServer = new static.Server('./');
require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    if ('/' === request.url || '/index.html' === request.url)
      request.url = 'public/index.html';

    if (request.url.match(/^\/(images|css)/))
      request.url = '/public' + request.url;


    fileServer.serve(request, response, function (err, result) {
      if (err && !request.url.match('/favicon.ico')) { // There was an error serving the file
        console.log("Error serving " + request.url + " - " + err.message);

        // Respond to the client
        response.writeHead(err.status, err.headers);
        response.end();
      }
    });
  });
}).listen(8080);

console.log('Serving files on port 8080')
