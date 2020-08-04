'use strict'

const { UserNotFoundException, PasswordMisMatchException } = use(
  '@adonisjs/auth/src/Exceptions'
)
const Hash = use('Hash')
const User = use('App/Models/User')

class AuthController {
  async login({ request, auth }) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.query().where('email', email).first()
    if (user) {
      const isSame = await Hash.verify(password, user.password)
      if (isSame) {
        return auth.generate(user)
      } else {
        throw new PasswordMisMatchException()
      }
    } else {
      throw new UserNotFoundException()
    }
  }

  async whoami({ auth }) {
    const user = await auth.getUser()
    return user
  }
}

module.exports = AuthController
