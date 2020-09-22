import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { SECRET } from "app.config";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: SECRET,
        })
    }

    async validate(payload: any) {
        return { id: payload.id, username: payload.username, role: payload.role };
    }
}