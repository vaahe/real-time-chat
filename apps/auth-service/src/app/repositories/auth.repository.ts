import { Inject, Injectable } from "@nestjs/common";
import { PrismaAuthService } from "../services/prisma.service";
import { SignUpRequest } from "@vaahe/proto";

@Injectable()
export class AuthRepository {
    constructor(@Inject() private readonly prisma: PrismaAuthService) { }

    async signUp(data: SignUpRequest) {
        await this.prisma.authCredential.create({
            data: {
                userId: '12',
                hashedPassword: '23',
                createdAt: Date.now().toString(),
            }
        });
    }

    async signIn(email: string) {
        return { email };
    }
}