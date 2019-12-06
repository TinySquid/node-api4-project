const getDefaultColors = require('../../defaultColors');

exports.seed = function (knex) {
  return knex('colors').insert(getDefaultColors(1));
};