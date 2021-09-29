const http = require('http');
const fs = require('fs');


const mime = {
	'html': 'text/html',
	'css': 'text/css',
	'js': 'text/javascript',
	'mjs': 'application/javascript',
};


function request(req, res) {
	if(!req.url.includes('.')) {
		if(!req.url.endsWith('/')) req.url += '/';
		req.url += 'index.html';
	}

	if(req.url.startsWith('/src')) req.url = '..' + req.url;
	else req.url = '.' + req.url;

	const ext = req.url.slice(req.url.lastIndexOf('.') + 1);

	fs.readFile(req.url, (err, data) => {
		if(err) {
			res.writeHead(404);
			res.end("404 Not Found");
			return;
		}

		res.writeHead(200, { 'Content-Type': mime[ext] ?? 'text/plain' });
		res.end(data);
	});
}


const server = http.createServer(request);
server.listen(8080, '127.0.0.1', () => {
	console.log("Server started at 127.0.0.1:8080");
});
