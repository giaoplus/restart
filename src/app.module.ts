import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelperModule } from './helper/helper.module';
import { DatabaseModule } from './processors/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

import { CorsMiddleware } from './middleware/cors.middleware';
import { OriginMiddleware } from './middleware/origin.middleware';

import { UserController } from './modules/user/user.controller';

@Module({
  imports: [
    HelperModule,
    DatabaseModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware, OriginMiddleware).forRoutes('*');
  }
}
