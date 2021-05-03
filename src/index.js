require('dotenv').config();
const Server = require('./models/sever');

const server = new Server();

server.lister();


