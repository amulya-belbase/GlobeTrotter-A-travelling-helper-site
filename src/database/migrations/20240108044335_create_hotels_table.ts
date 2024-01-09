import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('hotels',function(table){
        table.increments('id');
        table.integer('userId').references('id').inTable('users');
        table.string('hotelname').notNullable();
        table.string('location').notNullable();
        table.date('established').notNullable(); 
        table.integer('singlerooms').notNullable();
        table.integer('singleroomrate').notNullable();
        table.integer('doublerooms').notNullable();
        table.integer('doubleroomrate').notNullable();
        table.integer('suites').notNullable();
        table.integer('suiterate').notNullable();
        table.string('website').notNullable();
        table.string('email').notNullable();
        table.integer('phoneno').notNullable();
        table.string('image1');
        table.timestamp('createdat');
        table.timestamp('updatedat');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('hotels');
}

