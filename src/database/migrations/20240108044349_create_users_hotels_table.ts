import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users_hotels',function(table){
        table.increments('id');
        table.integer('userId').references('id').inTable('users');
        table.integer('hotelId').references('id').inTable('hotels').onDelete('CASCADE');
        table.string('hotelname').notNullable();
        table.date('arrivalDate').notNullable();
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

