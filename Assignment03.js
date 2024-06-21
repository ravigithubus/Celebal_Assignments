const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// Function to handle creating a file
const createFile = async (filePath, content, res) => {
  try {
    await fs.writeFile(filePath, content);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('File created successfully');
  } catch (err) {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Error creating file');
  }
};

// Function to handle reading a file
const readFile = async (filePath, res) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(data);
  } catch (err) {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Error reading file');
  }
};

// Function to handle deleting a file
const deleteFile = async (filePath, res) => {
  try {
    await fs.unlink(filePath);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('File deleted successfully');
  } catch (err) {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Error deleting file');
  }
};

// Create an HTTP server
const server = http.createServer(async (req, res) => {
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
    req.on('end', async () => {
      await createFile(filePath, body, res);
    });
  } else if (action === 'read') {
    await readFile(filePath, res);
  } else if (action === 'delete') {
    await deleteFile(filePath, res);
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Invalid action');
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
