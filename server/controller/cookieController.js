const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  // skip if conditional 
  // set cookie w/ val of user id
  const { id } = res.locals
  res.cookie('ssid', id);
  return next();
}

module.exports = cookieController;
