import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users_flights',function(table){
        table.increments('id');
        table.integer('user_id').references('id').inTable('users');
        table.integer('flight_id').references('id').inTable('flights');
        table.string('seat_type').notNullable(); 
        table.integer('seat_rate').notNullable();
        table.integer('seat_count').notNullable();
        table.timestamp('createdat');
        table.timestamp('updatedat');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users_flights');
}

