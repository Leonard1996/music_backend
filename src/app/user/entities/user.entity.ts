import { SoftDelete } from '../../common/soft.delete'
import { Column, Entity, OneToMany, Unique } from 'typeorm'
import { Favorite } from '../../favorite/entities/favorite.entity'
import { SearcHistory } from '../../search_song/entities/search.history.entity'

@Entity('users')
@Unique(['username'])
export class User extends SoftDelete {
  @Column('varchar', {
    nullable: false,
    length: 256,
    select: false,
  })
  public password: string

  @Column('varchar', {
    nullable: false,
    length: 256,
  })
  public username: string

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[]

  @OneToMany(() => SearcHistory, (searchHistory) => searchHistory.user)
  searchHistories: SearcHistory[]
}
