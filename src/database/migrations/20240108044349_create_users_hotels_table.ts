import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users_hotels',function(table){
        table.increments('id');
        table.integer('user_id').references('id').inTable('users');
        table.integer('hotel_id').references('id').inTable('hotels');
        table.string('room_type').notNullable(); 
        table.integer('room_rate').notNullable();
        table.integer('room_count').notNullable();
        table.timestamp('createdat');
        table.timestamp('updatedat');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users_hotels');
}

