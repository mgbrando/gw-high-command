const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {Leader} = require('./models/leader');

passport.use('local', new LocalStrategy(
  function(username, password, done) {
    Leader.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log('User: '+user);
      console.log('Repr: '+user);
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log('line 26: serialize '+ user._id);
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  console.log('Line 30, id: '+ id);
  Leader.findById(id, function(err, user) {
    done(err, user);
  });
});

const app = express();
app.use(cookieParser('keyboard cat'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const cookieExpirationDate = new Date();
const cookieExpirationDays = 365;
cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays);
app.use(session({ name: 'gw2highcommand',
                 secret: 'keyboard cat',
                 saveUninitialized: false,
                 resave: false,
                 cookie: {
 //                     httpOnly: ,
//                    expires: cookieExpirationDate, // use expires instead of maxAge
//                    secure: false
                      secure: false,
                      maxAge: (4 * 60 * 60 * 1000)
                }
             }));
app.use(passport.initialize());
app.use(passport.session());
//
/*var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
app.use(passport.initialize());
app.use(passport.session());*/
//
function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

const guildsRouter = require('./routers/guildsRouter');
const membersRouter = require('./routers/membersRouter');
const teamsRouter = require('./routers/teamsRouter');
const leadersRouter = require('./routers/leadersRouter');
const loginRouter = require('./routers/loginRouter');
const logoutRouter = require('./routers/logoutRouter');
const authorizationRouter = require('./routers/authorizationRouter');
const memberRegistrationRouter = require('./routers/memberRegistrationRouter');
const leaderRegistrationRouter = require('./routers/leaderRegistrationRouter');
const registrationRouter = require('./routers/registrationRouter');
const tasksRouter = require('./routers/tasksRouter');
const {DATABASE_URL, PORT} = require('./config');
const mongoose = require('mongoose');


// API endpoints go here!
app.use('/api/member-registration', memberRegistrationRouter);
app.use('/api/leader-registration', leaderRegistrationRouter);
app.use('/api/authorization', authorizationRouter(passport));
/*app.use('/api/login', loginRouter);
app.use('/api/tasks', tasksRouter);*/
app.use('/api/login', loginRouter(passport));
app.use('/api/logout', logoutRouter(passport));
app.use('/api/leaders', leadersRouter);
app.use('/api/guilds', guildsRouter);
app.use('/api/register', registrationRouter);
/*app.use('/api/members', membersRouter);
app.use('/api/teams', teamsRouter);*/

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

function runServer(databaseUrl=DATABASE_URL, port=3001){
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
