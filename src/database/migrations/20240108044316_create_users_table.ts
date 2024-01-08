import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users',function(table){
        table.increments('id');
        table.string('email').notNullable().unique();
        table.string('password').notNullable(); 
        table.string('firstname').notNullable();
        table.string('lastname').notNullable();
        table.date('dateofbirth').notNullable();
        table.string('gender').notNullable();
        table.string('profilepic');
        table.string('role').notNullable();
        table.timestamp('createdat');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

