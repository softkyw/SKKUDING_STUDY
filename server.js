const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');


const osInfo = {
    type: os.type(),
    hostname: os.hostname(),
    cpu_num: os.cpus().length,
    total_mem: os.totalmem() + ' MB'
  };



const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'week1.html');

  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end();
      return;
    }

    const result = html
    .replace('{{type}}', osInfo.type)
    .replace('{{hostname}}', osInfo.hostname)
    .replace('{{cpu_num}}', osInfo.cpu_num)
    .replace('{{total_mem}}', osInfo.total_mem)
  

    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(result);
  });
})

server.listen(3000, console.log('http://localhost:3000')); 