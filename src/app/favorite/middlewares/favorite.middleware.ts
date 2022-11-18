import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
export class FavoriteMiddleware {
  public static hasValidPaginationQueryParams = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const queryParams = Joi.object().keys({
      limit: Joi.string()
        .regex(/^[0-9]*$/)
        .required(),
      page: Joi.string()
        .regex(/^[0-9]*$/)
        .required(),
    })

    const result = queryParams.validate(request.query, { abortEarly: false })

    if (result.error) {
      return response.status(400).send(result.error)
    }
    next()
  }

  public static hasValidCreateFields = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const queryParams = Joi.object().keys({
      artistId: Joi.string().required(),
      songId: Joi.string().required(),
      metadata: Joi.string().required(),
    })

    const result = queryParams.validate(request.body, { abortEarly: false })

    if (result.error) {
      return response.status(400).send(result.error)
    }
    next()
  }
}
