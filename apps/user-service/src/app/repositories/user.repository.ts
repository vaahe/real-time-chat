import { Injectable } from '@nestjs/common';
import { SignUpRequest } from '@vaahe/proto';

import { User as UserModel } from '.prisma/client/user';
import { PrismaUserService } from '../services/prisma.service';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaUserService) { }

    async create(data: SignUpRequest): Promise<UserModel> {
        return this.prisma.user.create({ data });
    }

    async delete(id: string): Promise<UserModel> {
        return this.prisma.user.delete({
            where: { id }
        });
    }

    async findByEmail(email: string): Promise<UserModel | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findById(id: string): Promise<UserModel | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async getUsers(): Promise<UserModel[]> {
        return this.prisma.user.findMany();
    }
}
