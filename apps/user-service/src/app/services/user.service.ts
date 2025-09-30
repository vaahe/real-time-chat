import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { User as UserModel } from '.prisma/client/user';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async getUserById(id: string): Promise<UserModel | null> {
    return this.userRepository.findById(id);
  }

  async listUsers(): Promise<UserModel[]> {
    return this.userRepository.getUsers();
  }
}