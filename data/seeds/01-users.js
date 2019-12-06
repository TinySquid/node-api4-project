const bcrypt = require('bcrypt');

exports.seed = function (knex) {
  const admin = {
    username: 'admin',
    password: bcrypt.hashSync('password', 10)
  }

  return knex('users').insert(admin);
};