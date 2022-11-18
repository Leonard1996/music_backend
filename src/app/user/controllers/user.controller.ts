import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

export class UserController {
  public static getMe = async (request: Request, response: Response) => {
    try {
      const me = await UserService.getMe(response.locals.jwt.id)
      response.status(200).json({ me })
    } catch (error) {
      response.status(404).json({ message: 'User does not exist' })
    }
  }
}
