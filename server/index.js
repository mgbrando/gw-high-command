const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {Leader} = require('./models/leader');
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

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

passport.use(new LocalStrategy(
  function(username, password, done) {
    Leader.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


app.use(session({
  secret: 'something something',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  //console.log('line 26: serialize '+ user._id);
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  console.log('Line 30, id: '+ id);
  Leader.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(DATABASE_URL);

// API endpoints go here!
app.use('/api/member-registration', memberRegistrationRouter);
app.use('/api/leader-registration', leaderRegistrationRouter);
//app.use('/api/authorization', authorizationRouter(passport));
//app.use('/api/login', loginRouter(passport));
app.use('/api/logout', logoutRouter);
app.use('/api/leaders', leadersRouter);
app.use('/api/guilds', guildsRouter);
app.use('/api/register', registrationRouter);

const isAuthenticated = (req, res, next) => {
  console.log('81', req.user);
  if (req.user) {
      next();
  }
  // if they aren't redirect them to the login page
  else {
    res.json({message: 'uh oh'})
  }
}

app.get('/api/authorization', isAuthenticated, (req,res) => {
  console.log('After refresh browser:', req.user);
});

app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', {session: true}, (err, user, info) => {
        if (err) {
            console.log(err);
            return next(err); // will generate a 500 error
        }
        if (!user) {
            console.log('Incorrect user');
            return res.send({ success : false, message : info.message || 'Failed' });
        }

        console.log('After they login:', user);
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            return res.send({ success : true, message : 'Login success', user: user });
        });
    })(req, res, next);
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

app.listen(process.env.PORT || 3001, () => console.log('Server up and running!'));
