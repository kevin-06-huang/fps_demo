const path = require('path');

const User = require(path.join(__dirname, '../', 'model', 'userModel.js'));

const userController = {};

userController.createUser = async (req, res, next) => {
    try {
      /*const { username, password } = req.body;
      if ( !username || !password ) throw 'Empty username or password field';
      const newUser = await User.create({ username, password });
      res.locals.id = newUser._id.toString();
      return next();*/
    }
    catch (err) {
        return next({
          err: `An error has occurred: ${err}`
        });
    }
};