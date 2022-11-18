import { redisClient } from '../../../app'
import { getRepository } from 'typeorm'
import { SearcHistory } from '../entities/search.history.entity'
import { Favorite } from '../../favorite/entities/favorite.entity'
import { ISong } from '../interfaces/ISong'
require('dotenv').config()
const axios = require('axios')

export class SearchSongService {
  public static listSongs = async (userId: number, query: string) => {
    SearchSongService.checkCache(userId.toString(), query)

    let {
      data: {
        result: { songs },
      },
    } = await axios.request(SearchSongService.prepeareAxiosOptions(query))

    songs = await SearchSongService.addRelevance(songs, userId)
    return songs.sort((a: ISong, b: ISong) => b.relevance - a.relevance)
  }

  private static checkCache = async (userId: string, query: string) => {
    const isCached = await redisClient.hGet(userId, query)
    const searchHistoryRepository = getRepository(SearcHistory)

    if (!isCached) {
      await redisClient.hSet(userId, query, Date.now())
      const entry = searchHistoryRepository.create({ userId: +userId, query })
      searchHistoryRepository.save(entry)
      return
    }

    searchHistoryRepository
      .createQueryBuilder()
      .update(SearcHistory)
      .set({ timesSearched: () => 'timesSearched + 1' })
      .where('userId = :userId', { userId })
      .andWhere('query = :query', { query })
      .execute()
  }

  private static prepeareAxiosOptions = (query: string) => {
    return {
      method: 'GET',
      url: process.env.API_URL,
      params: { query },
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': process.env.API_HOST,
      },
    }
  }

  private static addRelevance = async (songs: ISong[], userId: number) => {
    let favoriteResults = await Promise.allSettled(
      SearchSongService.generateQueries(userId)
    )

    const favSongs = await getRepository(Favorite).find({ where: { userId } })

    const favMap = {} as { [id: string]: boolean }

    favSongs.forEach((song) => {
      favMap[song.id] = true
    })

    let values: any[] = []

    favoriteResults.forEach((favorite) => {
      if (favorite.status === 'fulfilled') {
        values = values.concat(favorite.value)
      }
    })

    const artistIdMap = {} as { [id: string]: number }
    const albumIdMap = {} as { [id: string]: number }

    values.forEach((value) => {
      const { artistId, albumId, relevance } = value
      if (!artistIdMap[artistId]) {
        artistIdMap[artistId] = 0
      }
      if (!albumIdMap[albumId]) {
        albumIdMap[albumId] = 0
      }

      if (artistId) artistIdMap[artistId] += relevance
      if (albumId) albumIdMap[albumId] += relevance
    })

    return songs.map((song) => {
      // some random relevance coefficients
      let relevance = (albumIdMap[song.album.album_id] ?? 0) * 0.75
      song.artists.forEach((artist) => {
        relevance += (artistIdMap[artist.artist_id] ?? 0) * 0.5
      })
      if (favMap[song.id]) relevance += 2

      return {
        ...song,
        relevance,
      }
    })
  }

  private static generateQueries = (userId: number) => {
    return ['artistId', 'albumId'].map((column) =>
      getRepository(Favorite)
        .createQueryBuilder('f')
        .select(`COUNT(${column}) as relevance, ${column}`)
        .groupBy(`${column}`)
        .where('userId = :userId', { userId })
        .getRawMany()
    )
  }

  public static listSuggestions = (userId: number) => {
    return redisClient.hGetAll(userId.toString())
  }
}
