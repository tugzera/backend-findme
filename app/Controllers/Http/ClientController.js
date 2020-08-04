'use strict'

const Client = use('App/Models/Client')

class ClientController {
  async index() {
    const items = await Client.all()
    return items
  }

  async show({ params }) {
    const { id } = params
    const item = await Client.findOrFail(id)
    return item
  }

  async store({ request }) {
    const data = request.only(['name'])
    const item = await Client.create(data)
    return item
  }

  async update({ request, params }) {
    const { id } = params
    const data = request.only(['name'])
    const item = await Client.findOrFail(id)
    item.merge(data)
    await item.save()
    return item
  }

  async destroy({ params }) {
    const { id } = params
    const item = await Client.findOrFail(id)
    await item.delete()
  }
}

module.exports = ClientController
