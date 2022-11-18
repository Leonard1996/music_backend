import express from 'express'
import { AuthenticationMiddleware } from '../authentication/middlewares/authentication.middleware'
import { SearchSongController } from './controllers/search.song.controller'
import { SearchSongMiddleware } from './middlewares/search.song.middleware'

export class SongRouter {
  public static configRoutes = (app: express.Application) => {
    app.get('/songs', [
      AuthenticationMiddleware.hasValidToken,
      AuthenticationMiddleware.isActive,
      SearchSongMiddleware.hasValidSearchParams,
      SearchSongController.listSongs,
    ])

    app.get('/songs/suggestions', [
      AuthenticationMiddleware.hasValidToken,
      AuthenticationMiddleware.isActive,
      SearchSongController.listSuggestions,
    ])
  }
}
