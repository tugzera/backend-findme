'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CollaboratorsSchema extends Schema {
  up () {
    this.create('collaborators', (table) => {
      table.increments()
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('id').on('users').onUpdate('cascade').onDelete('cascade')
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('collaborators')
  }
}

module.exports = CollaboratorsSchema
