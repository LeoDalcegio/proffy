import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.alterTable('users', table => {
        table.string('email').notNullable().defaultTo('');
        table.string('password').notNullable().defaultTo('');
        table.string('passwordResetToken').nullable();
        table.date('passwordResetExpires').nullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('email');
        table.dropColumn('password');
        table.dropColumn('passwordResetToken');
        table.dropColumn('passwordResetExpires');
    });    
}