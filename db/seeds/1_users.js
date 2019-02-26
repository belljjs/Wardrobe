
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, colName: 'top'},
        {id: 2, colName: 'bottom'},
        {id: 3, colName: 'dress'}
      ]);
    });
};