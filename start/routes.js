'use strict'

const Route = use('Route')

Route.post('/login', 'AuthController.login')
Route.get('/whoami', 'AuthController.whoami')
Route.resource('/clients', 'ClientController').apiOnly()
Route.resource('/collaborators', 'CollaboratorController').apiOnly()
Route.resource('serviceOrders', 'ServiceOrderController').apiOnly()
