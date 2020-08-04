'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ServiceOrder extends Model {
  static get table() {
    return 'service_orders'
  }

  client() {
    return this.belongsTo('App/Models/Client')
  }

  collaborator() {
    return this.belongsTo('App/Models/Collaborator')
  }
}

module.exports = ServiceOrder
