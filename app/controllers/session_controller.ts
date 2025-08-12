import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
    
    public async store({request, auth}: HttpContext){

        const {email, senha} = request.only(['email', 'senha'])
        const user = await User.verifyCredentials(email, senha)

        return await auth.use('api').createToken(user)
    }

    public async destroy({auth}: HttpContext){
        await auth.use('api').invalidateToken()
    }
}