import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { appKey } from 'Config/app'
export default class Auth {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    if ( appKey !== request.header('AppKey')) {
      response.unauthorized({ error: 'Unauthorized request' })
      return
    }
    await next()
  }
}
