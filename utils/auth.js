const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
      // update path is it changes
      res.redirect('/login');
    } else {
      next();
    }
  };

  module.exports = withAuth;