import { Column, Entity, ManyToOne, Unique } from 'typeorm'
import { User } from '../../user/entities/user.entity'
import { Common } from '../../common/common'

@Entity('searchHistories')
@Unique(['userId', 'query'])
export class SearcHistory extends Common {
  @Column('varchar')
  public query: string

  @Column('int', {
    default: 1,
  })
  public timesSearched: number

  @Column('int')
  public userId: number

  @ManyToOne(() => User, (user) => user.searchHistories)
  user: User
}
