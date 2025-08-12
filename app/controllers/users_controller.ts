import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'

export default class UsersController {

    public async index({response}: HttpContext){
        const users = await User.all()
        return response.json(users)
    }

    public async show({params, response}: HttpContext){
        const user = await User.find(params.id)

        if(!user)
            return response.status(404).json({message: 'user not found'})
        
        return response.json(user)
    }
    
    public async store({request, response}: HttpContext){
        const data = request.only(['nome', 'email', 'senha'])
        const user = await User.create(data)
        return response.status(201).json(user)
    }

    public async update({params, request, response}: HttpContext){
        const user = await User.find(params.id)

        if(!user)
            return response.status(404).json({message: 'user not found'})

        const data = request.only(['nome', 'email', 'senha'])
        user.merge(data)
        await user.save()

        return response.json(user)            
    }

    public async destroy({params, response}: HttpContext){
        const user = await User.find(params.id)

        if(!user)
            return response.status(404).json('user not found')

        await user.delete()
        return response.status(204).json(null)
    }
}