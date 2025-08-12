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
import SessionController from '#controllers/session_controller'
import TodosController from '#controllers/todos_controller'
// import { middleware } from './kernel.js'

router.post('/login', [SessionController, 'store'])
router.delete('/logout', [SessionController, 'destroy'])

// router.group(() => {
    
    router.get('/users', [UsersController, 'index'])
    router.get('/user/:id', [UsersController, 'show'])
    router.post('/user', [UsersController, 'store'])
    router.put('/user/:id', [UsersController, 'update'])
    router.delete('/user/:id', [UsersController, 'destroy'])

    router.get('/todos', [TodosController, 'index'])
    router.get('/todo/:id', [TodosController, 'show'])
    router.post('/todo', [TodosController, 'store'])
    router.put('/todo/:id', [TodosController, 'update'])
    router.delete('/todo/:id', [TodosController, 'destroy'])

// }).use(middleware.auth({guards: ['api']}))


