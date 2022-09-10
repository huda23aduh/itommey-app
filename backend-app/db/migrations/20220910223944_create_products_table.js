/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("products", function (table) {
    table.bigIncrements("id");
    table.string("name", 255).notNullable();
    table.integer("qty");
    table.binary("picture");
    table.date("expiredAt");
    table.boolean("isActive").defaultTo(true);
    table.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
