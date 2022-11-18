import { SearchSongService } from '../services/search.song.service'
import { Request, Response } from 'express'

export class SearchSongController {
  public static listSongs = async (request: Request, response: Response) => {
    try {
      const songs = await SearchSongService.listSongs(
        +response.locals.jwt.id,
        request.query.keyword.toString()
      )
      response.status(200).send({ songs })
    } catch (error) {
      console.log({ error })
      response.status(404).json({ message: 'Could not fetch suggestions' })
    }
  }

  public static listSuggestions = async (
    request: Request,
    response: Response
  ) => {
    try {
      const suggestions = await SearchSongService.listSuggestions(
        response.locals.jwt.id
      )
      response.status(200).send({ suggestions })
    } catch (error) {
      console.log({ error })
      response.status(404).json({ message: 'Could not fetch suggestions' })
    }
  }
}
