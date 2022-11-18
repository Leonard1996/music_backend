import { Favorite } from '../entities/favorite.entity'

export interface IFavoriteResponse {
  count: number
  favorites: Favorite[]
}
