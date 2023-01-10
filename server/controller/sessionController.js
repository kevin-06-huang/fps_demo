const path = require('path');

const Session = require(path.join(__dirname, '../', 'model', 'sessionModel.js'));

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = async (req, res, next) => {
  // write code here
  // verify ssid; handle if it's wrong
  try {
    const { ssid } = req.cookies;
    if (!ssid) throw 'No ssid in cookies';
    const session = await Session.findOne({ cookieId: ssid });
    if (session) return next();
    else throw 'Session doesn\'t exist';
  }
  catch (err) {
    return next({
      err: `An error has occurred: ${err}`,
      redirect: true
    });
  }
};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = async (req, res, next) => {
  // check conditional and only start session if id doesnt exist
  //write code here
  try{
    const { id } = res.locals;
    const session = await Session.findOne({ cookieId: id });
    if (session) return next();
    else {
      await Session.create({ cookieId: id });
      return next();
    }
  }
  catch (err) {
    return next({
      err: `An error has occurred: ${err}`
    });
  }
};

module.exports = sessionController;
