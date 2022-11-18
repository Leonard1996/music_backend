import { getRepository } from 'typeorm'
import { User } from '../entities/user.entity'

export class UserService {
  public static getMe = (id: number) => {
    const userRepository = getRepository(User)
    return userRepository.findOne(id)
  }
}
