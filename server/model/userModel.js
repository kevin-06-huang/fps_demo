const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.pre('save', async function(next) {
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    try{
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      return next();
    } catch (err) {
      return next({
      err: `An error has occurred: ${err}`
    });
  }
});

userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);

    return isMatch;
  } catch (err) {
    return next({
      err: `An error has occurred: ${err}`
      });
  }
};
  
module.exports = mongoose.model('User', userSchema);
