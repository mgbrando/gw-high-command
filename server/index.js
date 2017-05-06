const path = require('path');
const express = require('express');
const guildsRouter = require('./routers/guildsRouter');
const membersRouter = require('./routers/membersRouter');
const teamsRouter = require('./routers/teamsRouter');
const loginRouter = require('./routers/loginRouter');
const memberRegistrationRouter = require('./routers/memberRegistrationRouter');
const leaderRegistrationRouter = require('./routers/leaderRegistrationRouter');
const tasksRouter = require('./routers/tasksRouter');
const {DATABASE_URL, PORT} = require('./config');
const mongoose = require('mongoose');
const app = express();

// API endpoints go here!
app.use('/api/member-registration', memberRegistrationRouter);
app.use('/api/leader-registration', leaderRegistrationRouter);
/*app.use('/api/login', loginRouter);
app.use('/api/tasks', tasksRouter);*/
app.use('/api/guilds', guildsRouter);
/*app.use('/api/members', membersRouter);
app.use('/api/teams', teamsRouter);*/
/*app.use('*', (req, res) => {
    res.status(404).json({message: 'Not Found'});
});*/

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});
/* ORIGINAL
let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            resolve();
        }).on('error', reject);
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}*/
//MINE
let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT){
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if(err){
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port: ${port}`);
                resolve();
            })
            .on('error', err => {
                mongoose.disconnect();
                reject(err)
            });
        });
    });
}

function closeServer(){
    return mongoose.disconnect()
        .then(() => {
            return new Promise((resolve, reject) => {
                console.log('Closing server');
                server.close(err => {
                    if(err){
                        return reject(err);
                    }
                    resolve();
                });
            });
        });
}
if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
