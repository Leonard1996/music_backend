import { Request, Response } from 'express'
import { FavoriteService } from '../services/favorite.service'

export class FavoriteController {
  public static list = async (request: Request, response: Response) => {
    try {
      const me = await FavoriteService.list({
        userId: response.locals.jwt.id,
        page: +request.query.page,
        limit: +request.query.limit,
      })
      response.status(200).json({ me })
    } catch (error) {
      response
        .status(404)
        .json({ message: 'Could not retrieve user favorites' })
    }
  }

  public static create = async (request: Request, response: Response) => {
    try {
      const favorite = await FavoriteService.create(
        response.locals.jwt.id,
        request.body
      )
      response.status(201).json({ favorite })
    } catch (error) {
      response.status(404).json({ message: 'Could not add to favorites' })
    }
  }

  public static update = async (request: Request, response: Response) => {
    try {
      await FavoriteService.update(
        response.locals.jwt.id,
        +request.params.favoriteId
      )
      response.sendStatus(204)
    } catch (error) {
      response.status(404).json({ message: 'Could not update to favorites' })
    }
  }
}
