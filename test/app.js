require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const user = require('./routes/users');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('conn', io);

app.use('/users', user);

let port = process.env.PORT || 3000;

httpServer.listen(port, () => console.log(`Running at port ${port}`));
