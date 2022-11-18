import { SoftDelete } from '../../common/soft.delete'
import { Column, Entity, Index, ManyToOne, Unique } from 'typeorm'
import { User } from '../../user/entities/user.entity'

@Entity('favorites')
@Unique(['userId', 'songId'])
export class Favorite extends SoftDelete {
  @Column('int')
  public userId: number

  @Index()
  @Column('varchar')
  artistId: string

  @Index()
  @Column('varchar')
  songId: string

  @Column('text')
  metadata: string

  @Index()
  @Column('varchar', { nullable: true })
  albumId: string

  @ManyToOne(() => User, (user) => user.favorites)
  user: User
}
