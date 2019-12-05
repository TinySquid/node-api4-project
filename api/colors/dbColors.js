const db = require('../../data/dbConfig');

module.exports = {
  getById,
  getByUserId,
  insert,
  update,
  remove,
};

function getById(id) {
  return db('colors')
    .where({ id })
    .first();
}

function getByUserId(userId) {
  return db('colors')
    .where({ user_id: userId });
}

function insert(color) {
  return db('colors')
    .insert(color)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('colors')
    .where({ id: id })
    .update(changes)
    .then(() => getById(id));
}

function remove(id, user_id) {
  return db('colors')
    .where({ id: id, user_id: user_id })
    .del();
}
