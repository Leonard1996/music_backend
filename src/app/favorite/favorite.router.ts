import express from 'express'
import { AuthenticationMiddleware } from '../authentication/middlewares/authentication.middleware'
import { FavoriteController } from './controllers/favorite.controller'
import { FavoriteMiddleware } from './middlewares/favorite.middleware'

export class FavoriteRouter {
  public static configRoutes = (app: express.Application) => {
    app.get('/me/favorites', [
      AuthenticationMiddleware.hasValidToken,
      AuthenticationMiddleware.isActive,
      FavoriteMiddleware.hasValidPaginationQueryParams,
      FavoriteController.list,
    ])

    app.post('/favorites', [
      AuthenticationMiddleware.hasValidToken,
      AuthenticationMiddleware.isActive,
      FavoriteMiddleware.hasValidCreateFields,
      FavoriteController.create,
    ])

    app.patch('/favorites/:favoriteId', [
      AuthenticationMiddleware.hasValidToken,
      AuthenticationMiddleware.isActive,
      FavoriteController.update,
    ])
  }
}
