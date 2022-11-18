import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export class SearchSongMiddleware {
  public static hasValidSearchParams = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const queryParams = Joi.object().keys({
      keyword: Joi.string().required(),
    })

    const result = queryParams.validate(request.query, { abortEarly: false })

    if (result.error) {
      return response.status(400).send(result.error)
    }
    next()
  }
}
