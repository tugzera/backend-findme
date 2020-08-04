'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceOrderSchema extends Schema {
  up() {
    this.create('service_orders', (table) => {
      table.increments()
      table.integer('opened_at').notNullable()
      table.integer('client_id').unsigned().index()
      table
        .foreign('client_id')
        .references('id')
        .on('clients')
        .onUpdate('cascade')
        .onDelete('cascade')
      table.integer('collaborator_id').unsigned().index()
      table
        .foreign('collaborator_id')
        .references('id')
        .on('collaborators')
        .onUpdate('cascade')
        .onDelete('cascade')
      table.integer('latitude').notNullable()
      table.integer('longitude').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('service_orders')
  }
}

module.exports = ServiceOrderSchema
