import { INestApplication, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();

        this.$use(async (params, next) => {
            const result  = await next(params);
            console.log('middleware', params.action);
            return result;
        })
    }

    

    async enableShutdownHooks(app: INestApplication) {
        
        this.$on('beforeExit', async ()=> 
            await app.close()
        )
    }
}