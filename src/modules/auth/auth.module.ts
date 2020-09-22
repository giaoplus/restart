import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SECRET } from 'app.config';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: SECRET,
            signOptions: { expiresIn: '8h' }
        }),
        UserModule
    ],
    providers: [ AuthService, JwtStrategy ],
    exports: [ AuthService ]
})
export class AuthModule {}
