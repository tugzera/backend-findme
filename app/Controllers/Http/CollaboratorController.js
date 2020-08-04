'use strict'

const Collaborator = use('App/Models/Collaborator')
const User = use('App/Models/User')

class CollaboratorController {
  async index() {
    const items = await Collaborator.all()
    return items
  }

  async show({ params }) {
    const { id } = params
    const item = await Collaborator.findOrFail(id)
    return item
  }

  async store({ request }) {
    const { email, password, name } = request.only([
      'email',
      'password',
      'name'
    ])
    const userData = { email, password }
    const user = await User.create(userData)
    const collaboratorData = { user_id: user.id, name }
    const collaborator = await Collaborator.create(collaboratorData)
    return collaborator
  }

  async update({ request, params }) {
    const { id } = params
    const { email, password, name } = request.only([
      'email',
      'password',
      'name'
    ])
    const userData = { email, password }
    const user = await User.query()
      .with('collaborator', (builder) => {
        builder.where('user_id', id)
      })
      .firstOrFail()
    user.merge(userData)
    await user.save()
    const collaborator = await Collaborator.findOrFail(id)
    collaborator.merge(data)
    await collaborator.save()
    await user.load('collaborator')
    return user
  }

  async destroy({ params }) {
    const { id } = params
    const item = await User.query()
      .with('collaborator', (builder) => {
        builder.where('user_id', id)
      })
      .firstOrFail()
    await item.delete()
  }
}

module.exports = CollaboratorController
