const http = require('http');

const PORT = process.env.PORT || 5000;

const reqListener = async (req, res) => {
    if(req.url === "/" && req.method === 'GET'){
        res.writeHead(200, {'Content-Type': "application/json"});
        res.end("Ending");
    }
};

const server = http.createServer(reqListener).listen(PORT);
console.log(`Server running at port ${PORT}`);
