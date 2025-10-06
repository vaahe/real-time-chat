import { Inject, Injectable } from "@nestjs/common";
import { PrismaAuthService } from "../services/prisma.service";
import { SignUpRequest } from "@vaahe/proto";

@Injectable()
export class AuthRepository {
    constructor(@Inject() private readonly prisma: PrismaAuthService) { }

    async findByUsername(username: string) {
        return this.prisma.authCredential.findUnique({
            where: { username }
        });
    }

    async updateLastLogin(userId: string) {
        await this.prisma.authCredential.update({
            where: {
                userId
            },
            data: {
                lastLoginAt: new Date()
            }
        })
    }
}