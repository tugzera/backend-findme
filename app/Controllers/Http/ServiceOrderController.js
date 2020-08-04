'use strict'

const ServiceOrder = use('App/Models/ServiceOrder')

class ServiceOrderController {
  async index() {
    const items = await ServiceOrder.query()
      .with('client')
      .with('collaborator')
      .fetch()
    return items
  }

  async show({ params }) {
    const { id } = params
    const item = await ServiceOrder.query()
      .where('id', id)
      .with('client')
      .with('collaborator')
      .firstOrFail()
    return item
  }

  async store({ request, auth }) {
    const user = await auth.getUser()
    const collaborator = await user.collaborator().fetch()
    const { opened_at, latitude, longitude, client_id } = request.only([
      'opened_at',
      'latitude',
      'longitude',
      'client_id'
    ])
    const data = {
      collaborator_id: collaborator.id,
      opened_at,
      latitude,
      longitude,
      client_id
    }
    const item = await ServiceOrder.create(data)
    return item
  }

  async update({ request, params }) {
    const { id } = params
    const data = request.only([
      'opened_at',
      'latitude',
      'longitude',
      'client_id'
    ])
    const item = await ServiceOrder.findOrFail(id)
    item.merge(data)
    await item.save()
    return item
  }

  async destroy({ params }) {
    const { id } = params
    const item = await ServiceOrder.findOrFail(id)
    await item.delete()
  }
}

module.exports = ServiceOrderController
