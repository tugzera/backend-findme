'use strict'

const Collaborator = use('App/Models/Collaborator')
const User = use('App/Models/User')

class CollaboratorController {
  async index() {
    const items = await User.query().with('collaborator').fetch()
    return items
  }

  async show({ params }) {
    const { id } = params
    const item = await User.query()
      .with('collaborator', (builder) => {
        builder.where('id', id)
      })
      .firstOrFail()
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
    await Collaborator.create(collaboratorData)
    await user.load('collaborator')
    return user
  }

  async update({ request, params }) {
    const { id } = params
    const { email, password, name } = request.only([
      'email',
      'password',
      'name'
    ])
    const userData = { email, password }
    const collaborator = await Collaborator.findOrFail(id)
    collaborator.merge({ name })
    await collaborator.save()
    const user = await User.findOrFail(collaborator.id)
    user.merge(userData)
    await user.save()
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
