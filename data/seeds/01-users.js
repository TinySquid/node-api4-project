const bcrypt = require('bcrypt');

exports.seed = function (knex) {
  const admin = {
    username: 'admin',
    password: bcrypt.hashSync('password', 10)
  }

  const demo = {
    username: 'demo',
    password: bcrypt.hashSync('demo123', 10)
  }

  const users = [admin, demo];

  return knex('users').insert(users);
};