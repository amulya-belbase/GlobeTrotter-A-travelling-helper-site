import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('flights',function(table){
        table.increments('id');
        table.integer('userId').references('id').inTable('users');
        table.string('flightname').notNullable();
        table.string('flightdepart').notNullable();
        table.string('flightdest').notNullable(); 
        table.integer('economy').notNullable();
        table.integer('economyrate').notNullable();
        table.integer('business').notNullable();
        table.integer('businessrate').notNullable();
        table.string('website').notNullable();
        table.string('email').notNullable();
        table.bigInteger('phoneno').notNullable();
        table.string('image1');
        table.timestamp('createdat');
        table.timestamp('updatedat');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('flights');
}

