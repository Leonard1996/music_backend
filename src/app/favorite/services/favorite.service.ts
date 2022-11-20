import { getRepository } from 'typeorm'
import { CreateFavoriteDto } from '../dtos/create.favorite.dto'
import { FavoriteQueryParamsDto } from '../dtos/favorite.query.params.dto'
import { Favorite } from '../entities/favorite.entity'
import { IFavoriteResponse } from '../interfaces/IFavoritesResponse'

export class FavoriteService {
  public static list = async ({
    userId,
    limit,
    page,
  }: FavoriteQueryParamsDto): Promise<IFavoriteResponse> => {
    const favoriteRepository = getRepository(Favorite)

    const count = await favoriteRepository.count({ where: { userId } })

    const favorites = await favoriteRepository
      .createQueryBuilder('f')
      .where('f.userId = :userId', { userId })
      .orderBy('f.id', 'DESC')
      .limit(limit)
      .offset((page - 1) * limit)
      .getMany()

    return {
      count,
      favorites,
    }
  }

  public static create = (userId: number, payload: CreateFavoriteDto) => {
    const favoriteRepository = getRepository(Favorite)
    const favorite = favoriteRepository.create({ ...payload, userId })
    return favoriteRepository.save(favorite)
  }

  public static delete = (userId: number, id: number) => {
    const favoriteRepository = getRepository(Favorite)
    return favoriteRepository.delete({ id, userId })
  }
}
