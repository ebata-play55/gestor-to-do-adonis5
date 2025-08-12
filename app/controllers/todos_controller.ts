import type { HttpContext } from '@adonisjs/core/http'
import Todo from '../models/todo.js'
import { editTodo } from '#abilities/main'

export default class TodosController {

     public async index({response}: HttpContext){
        const todos = await Todo.all()
        return response.json(todos)
    }

    public async show({params, response}: HttpContext){
        const todo = await Todo.find(params.id)

        if(!todo)
            return response.status(404).json({message: 'todo not found'})
        
        return response.json(todo)
    }
    
    public async store({auth, request, response}: HttpContext){
        
        const user = await auth.authenticate()

        const data = request.only(['titulo', 'status'])
 
        const todo = await Todo.create({userId: user.id, ...data})
        return response.status(201).json(todo)
    }

    public async update({bouncer, params, request, response}: HttpContext){
        const todo = await Todo.find(params.id)

        if(!todo)
            return response.status(404).json({message: 'todo not found'})

        if (await bouncer.denies(editTodo, todo))
            response.abort('Your cannot edit the todo', 403)

        const data = request.only(['titulo', 'status'])
        todo.merge(data)
        await todo.save()

        return response.json(todo)
    }

    public async destroy({params, response}: HttpContext){
        const todo = await Todo.find(params.id)

        if(!todo)
            return response.status(404).json('todo not found')

        await todo.delete()
        return response.status(204).json(null)
    }
}