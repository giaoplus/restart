import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from 'src/utils/cryptogram';
import { UserDoc } from '../user/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ){}

    async validateUser(username: string, password: string):Promise<any> {
        const user = await this.userService.findOneByUsername(username);
        if(user){
            const hashedPassword = user.password;
            const salt = user.salt;
            const hashPassword = encryptPassword(password, salt);

            if(hashedPassword !== hashPassword) return { code: 2, msg: '密码错误!' };

            return { code: 1, user };
        }

        return { code: 3, msg: '账户不存在!' };
    }

    async certificate(user: UserDoc):Promise<any> {
        const payload = {username: user.username, sub: user._id, role: user.role};
        try{
            const token = this.jwtService.sign(payload);
            return {
                code: 200,
                data: {
                    token
                },
                msg: '登录成功！'
            }
        }catch(e){
            return {
                code: 400,
                msg: '登录异常！'
            }
        }
    }
}
