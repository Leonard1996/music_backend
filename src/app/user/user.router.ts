import express from 'express'
import { AuthenticationMiddleware } from '../authentication/middlewares/authentication.middleware'
import { UserController } from './controllers/user.controller'

export class UserRouter {
  public static configRoutes = (app: express.Application) => {
    app.get('/me', [
      AuthenticationMiddleware.hasValidToken,
      AuthenticationMiddleware.isActive,
      UserController.getMe,
    ])
  }
}
