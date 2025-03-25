/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('books', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('author').notNullable();
    table.string('publisher').notNullable();
    table.text('anotation').notNullable();
    table.integer('added_by').references('id').inTable('users').onDelete('SET NULL');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('books');
};
