import { Injectable } from '@nestjs/common';
import { Auth } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
    private readonly auths: Auth[] = [];

    create(auth: Auth) {
        this.auths.push(auth);
    }

    findAll(): Auth[] {
        return this.auths;
    }

    findOne(name: string): Auth {
        return this.auths.filter(e => e.name === name)[0];
    }
}
