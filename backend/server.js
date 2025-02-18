//we are using another file of server.js as it makes it easy to use socket io integration
import http from 'http';
import app from './app.js';
import 'dotenv/config.js';//to use environment variables

const server = http.createServer(app);//creating server using http module
const port = process.env.PORT || 3000;//setting port number

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});