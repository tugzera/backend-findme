'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Collaborator extends Model {
  static get table() {
    return 'collaborators'
  }
}

module.exports = Collaborator
