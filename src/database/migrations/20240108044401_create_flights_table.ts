import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('flights',function(table){
        table.increments('id');
        table.string('flightname').notNullable();
        table.string('flightdepart').notNullable();
        table.date('flightdest').notNullable(); 
        table.integer('economy').notNullable();
        table.integer('economyrate').notNullable();
        table.integer('business').notNullable();
        table.integer('businessrate').notNullable();
        table.string('website').notNullable();
        table.string('email').notNullable();
        table.integer('phoneno').notNullable();
        table.string('image1');
        table.string('image2');
        table.string('image3');
        table.timestamp('createdat');
        table.timestamp('updatedat');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('flights');
}

