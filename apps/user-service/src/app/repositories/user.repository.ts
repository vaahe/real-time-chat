import { Injectable } from '@nestjs/common';
import { User as UserModel } from '.prisma/client/user';
import { PrismaClient } from '.prisma/client/user';
import { SignUpRequest } from '@vaahe/proto';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async create(data: SignUpRequest): Promise<UserModel> {
        return this.prisma.user.create({ data });
    }

    async findByEmail(email: string): Promise<UserModel | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findById(id: string): Promise<UserModel | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }
}
