import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelperModule } from './helper/helper.module';
import { DatabaseModule } from './processors/database/database.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    HelperModule,
    DatabaseModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
