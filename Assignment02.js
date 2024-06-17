const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to handle creating a file
const createFile = (filePath, content, res) => {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Error creating file');
    } else {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('File created successfully');
    }
  });
};

// Function to handle reading a file
const readFile = (filePath, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Error reading file');
    } else {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(data);
    }
  });
};

// Function to handle deleting a file
const deleteFile = (filePath, res) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Error deleting file');
    } else {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('File deleted successfully');
    }
  });
};

// Create an HTTP server
const server = http.createServer((req, res) => {
  const urlParts = req.url.split('/');
  const action = urlParts[1];
  const fileName = urlParts[2];

  if (!fileName) {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.end('File name is required');
    return;
  }

  const filePath = path.join(__dirname, fileName);

  if (action === 'create') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      createFile(filePath, body, res);
    });
  } else if (action === 'read') {
    readFile(filePath, res);
  } else if (action === 'delete') {
    deleteFile(filePath, res);
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Invalid action');
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
