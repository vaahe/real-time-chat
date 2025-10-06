import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { User as UserModel } from '.prisma/client/user';
import { SignUpRequest } from "@vaahe/proto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async createUser(data: SignUpRequest): Promise<UserModel> {
    return this.userRepository.create(data);
  }

  async deleteUser(id: string): Promise<UserModel> {
    return this.userRepository.delete(id);
  }

  async getUserById(id: string): Promise<UserModel | null> {
    return this.userRepository.getById(id);
  }

  async getUserByEmail(email: string): Promise<UserModel | null> {
    return this.userRepository.getByEmail(email);
  }

  async listUsers(): Promise<UserModel[]> {
    return this.userRepository.getUsers();
  }
}