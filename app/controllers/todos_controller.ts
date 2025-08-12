import type { HttpContext } from '@adonisjs/core/http'
import Todo from '../models/todo.js'

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
    
    public async store({request, response}: HttpContext){
        const data = request.only(['userId', 'titulo', 'status'])
        const todo = await Todo.create(data)
        return response.status(201).json(todo)
    }

    public async update({params, request, response}: HttpContext){
        const todo = await Todo.find(params.id)

        if(!todo)
            return response.status(404).json({message: 'todo not found'})

        const data = request.only(['userId', 'titulo', 'status'])
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