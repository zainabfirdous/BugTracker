// config/passportConfig.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const Employee = require('../models/Employee.js');
const EmpProfile = require('../models/EmpProfile.js');
// Serialize user to store in the session
passport.serializeUser((user, done) => {
  console.log("Serialization process");
  done(null, user.empID);
});

// Deserialize user to retrieve from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Employee.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Configure the local strategy for username and password authentication
passport.use(new LocalStrategy(
  { usernameField: 'userName', passwordField: 'password' },
  async (username, password, done) => {
    try {
      const user = await EmpProfile.findOne({ where: { userName: username } });
      console.log("Authentication process");
      // Check if the user exists and if the password is correct
      if (!user || user.password !== password) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      // Authentication successful, pass the user object to the next middleware
      return done(null, user);
    } catch (error) {
      // Error during authentication
      return done(error);
    }
  }
));

module.exports = passport;
