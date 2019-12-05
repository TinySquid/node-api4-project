const router = require('express').Router();
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

const userDB = require('./dbHelpers');

// const authenticator = require('../users/authenticator');

// router.post('/validate', authenticator, (req, res) => {
//   res.status(200).json();
// });

router.post("/login", (req, res) => {
  /* Steps for user login authentication.
  Verify username and password is provided.
  Verify proper password has been provided (if user exists)
  Generate JWT for user and send it to client in a 200 response 
  */
  const { username, password } = req.body;

  if (username && password) {
    //Information has been provided correctly.
    userDB.getByUsername(username)
      .then(user => {
        if (user) {
          //User exists in the database.
          bcrypt.compare(password, user.password)
            .then(result => {
              if (result) {
                //User has provided the correct password.
                const secret = Buffer.from(process.env.SECRET, process.env.SECRET_ENCODING); //Get secret to generate JWT.
                const token = jwt.encode({ id: user.id, username: user.username, expiration: moment().add(10, 'minutes').format() }, secret);
                res.status(200).json({ token: token });
              } else {
                //Invalid password provided for specified user.
                res.status(401).json({ message: "Invalid username / password combination." });
              }
            })
            .catch(error => {
              //Error with bcrypt.
              res.status(500).json({ message: "Error while logging user in.", error: error });
            });
        } else {
          //Username doesn't exist in database.
          res.status(404).json({ message: "User does not exist." });
        }
      })
      .catch(error => {
        //Error retrieving user from database.
        res.status(500).json({ message: "Error logging user in.", error: error });
      });
  } else {
    //request body didn't have the right properties
    res.status(403).json({ message: "Please provide username and password." });
  }
});

//POST /api/user/signup - Add new user to database.
// router.post("/signup", (req, res) => {
//   res.status(200).json();
// });

module.exports = router;