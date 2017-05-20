module.exports = function (req, res, next) {
console.log(req.isAuthenticated());
console.log(req.user);
   if(req.user)
      return next();
   else
      return res.status(401).json({
        errorMessage: 'User not authenticated'
      });
};