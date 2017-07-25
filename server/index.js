const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Leader} = require('./models/leader');
const guildsRouter = require('./routers/guildsRouter');
const leadersRouter = require('./routers/leadersRouter');
const authorizationRouter = require('./routers/authorizationRouter');
const memberRegistrationRouter = require('./routers/memberRegistrationRouter');
const leaderRegistrationRouter = require('./routers/leaderRegistrationRouter');
const registrationRouter = require('./routers/registrationRouter');
const {DATABASE_URL, PORT} = require('./config');
const mongoose = require('mongoose');


const app = express();
app.use(express.static(path.resolve(__dirname, '../client/build')));

passport.use(new LocalStrategy(
  function(username, password, done) {
    Leader.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      return user.validatePassword(password)
      .then(validated => {
        if(validated){
          return done(null, user);
        }
        else{
          return done(null, false, { message: 'Incorrect password' });
        }
      });
    });
  }
));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  Leader.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(jsonParser);

// API endpoints go here!
app.use('/api/member-registration', memberRegistrationRouter);
app.use('/api/leader-registration', leaderRegistrationRouter);
app.use('/api/leaders', leadersRouter);
app.use('/api/guilds', guildsRouter);
app.use('/api/register', registrationRouter);

const isAuthenticated = (req, res, next) => {
  if (req.user) {
      next();
  }
  // if they aren't redirect them to the login page
  else {
    res.json({authenticated: false});
  }
}

app.get('/api/authorization', isAuthenticated, (req,res) => {
  return res.json({ user: req.user.apiRepr() });
});

app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', {session: true}, (err, user, info) => {
        if (err) {
            return next(err); // will generate a 500 error
        }
        if (!user) {
            return res.send({ success : false, message : info.message || 'Failed' });
        }

        req.logIn(user, (err) => {
            if (err) { return next(err); }

            return res.send({ success : true, message : 'Login success', user: user });
        });
    })(req, res, next);
});

app.post('/api/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
      if(err) {
        console.log(err);
      }
      res.redirect('/');
    });
});
// Serve the built client
//app.use(express.static(path.resolve(__dirname, '../client/build')));
//app.use(express.static(path.resolve(__dirname, '../client/public')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;

function runServer(databaseUrl=DATABASE_URL, port=3001){
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb://mgbrando:aidynmb9@ds149030.mlab.com:49030/gwhighcommand', {useMongoClient: true}, err => {
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
