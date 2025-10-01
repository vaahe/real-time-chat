import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient as AuthPrismaClient } from '.prisma/client/auth';

@Injectable()
export class PrismaAuthService extends AuthPrismaClient implements OnModuleInit, OnModuleDestroy {
    private logger = new Logger(PrismaAuthService.name);

    async onModuleInit() {
        await this.$connect();
        this.logger.log("Prisma connected");
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}