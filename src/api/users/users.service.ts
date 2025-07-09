import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/services/typeorm/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Finds a user by their unique ID.
   *
   * @param id - The ID of the user to find.
   * @throws NotFoundException if no user with the given ID exists.
   * @returns The found User entity.
   */
  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  /**
   * Finds a user by their email address.
   *
   * @param email - The email of the user to find.
   * @returns The User entity if found, otherwise undefined or null.
   */
  async findByEmail(email: string): Promise<User | undefined | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  /**
   * Creates and saves a new user with the given data.
   *
   * @param data - Partial user data to create the new user.
   * @returns The newly created User entity.
   */
  async create(data: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }
}
