import { Module } from '@nestjs/common';
import { UserProvider } from './user.model';
import { UserService } from './user.service';

@Module({
    providers: [ UserService, UserProvider ],
    exports: [ UserService ]
})
export class UserModule {}
