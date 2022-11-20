import express from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
require('dotenv').config()
var bodyParser = require('body-parser')
import { AuthenticationRouter } from './app/authentication/authentication.router'
import { UserRouter } from './app/user/user.router'
import cors from 'cors'
import { FavoriteRouter } from './app/favorite/favorite.router'
import { SongRouter } from './app/search_song/search.song.router'
const redis = require('redis')

export let redisClient: any
;(async () => {
  redisClient = redis.createClient({
    socket: {
      port: 6379,
      host: 'cache',
    },
  })

  redisClient.on('error', (error: any) => console.error(`Error : ${error}`))

  await redisClient.connect()
})()

export const app = express()
app.use(cors())
app.use(bodyParser())

const port = process.env.PORT || 3001
if (process.env.NODE_ENV !== 'test') {
  createConnection()
    .then(async () => {})
    .catch((error) => console.log(error))
}

AuthenticationRouter.configRoutes(app)
UserRouter.configRoutes(app)
FavoriteRouter.configRoutes(app)
SongRouter.configRoutes(app)

app.listen(port, () => {
  return console.log(`server is listening on ${port}`)
})
