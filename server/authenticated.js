module.exports = function (req, res, next) {
console.log(req.isAuthenticated());
console.log(req.user);
//req.user
   if(req.isAuthenticated())
      return next();
   else
      return res.status(401).json({
        message: 'User not authenticated'
      });
};