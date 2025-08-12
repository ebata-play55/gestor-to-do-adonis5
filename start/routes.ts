/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'

router.get('/users', [UsersController, 'index'])
router.get('/user/:id', [UsersController, 'show'])
router.post('/user', [UsersController, 'store'])
router.put('/user/:id', [UsersController, 'update'])
router.delete('/user/:id', [UsersController, 'destroy'])


