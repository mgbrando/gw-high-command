module.exports = function (req, res, next) {
//console.log(req.session.passport.user);
//req.user
	console.log("SESSION _____");
	console.log(req.session);
   if(req.session.passport.user === req.body.userID)//req.isAuthenticated() && req.user)// === req.body.userId) //&& req.cookies['gw2highcommand'])
      return next();
   else
      return res.status(401).json({
        message: 'User not authenticated'
      });
};