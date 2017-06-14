module.exports = function (req, res, next) {
console.log(req.isAuthenticated());
//console.log(req.session.passport.user);
//req.user

	/*console.log('---');
	console.log(req);
	console.log('---');
	console.log(req.sessionID);
	console.log(req.user)*/
   if(req.user)//req.sessionStore.sessions[req.body.sessionID].passport.user === req.body.userID)//req.isAuthenticated() && req.user)// === req.body.userId) //&& req.cookies['gw2highcommand'])
      return next();
   else
      return res.status(401).json({
        message: 'User not authenticated'
      });
};