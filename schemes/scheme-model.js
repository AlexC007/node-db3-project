const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes')
    .where({ id: Number(id) })
    .first();
}

function findSteps(id){
    return db('schemes')
    .join('steps', 'schemes.id', 'steps.scheme_id')
    .select('steps.id', 'schemes.scheme_name','steps.step_number', 'steps.instructions')
    .where('schemes.id',id)
    .orderBy('steps.step_number')
}

function add(scheme) {
  return db('schemes')
    .insert(scheme)
    .then(ids => ({ id: ids[0] }));
}

function update(changes, id) {
  return db('schemes')
    .where('id', Number(id))
    .update(changes);
}

function remove(id) {
  return db('schemes')
    .where('id', Number(id))
    .del();
}
