import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserProviderName, UserDoc } from './user.model';
import { makeSalt, encryptPassword } from 'src/utils/cryptogram';
import { RegisterDTO } from './user.dto';

export interface User {
    id: string;
    username: string;
    role: number;
    status: number;
    moible?: string;
    email?: string;
    createTime: string;
    updateTime: string;
}

@Injectable()
export class UserService {
    constructor(
        @Inject(UserProviderName) private readonly userModel: Model<UserDoc>
    ){}

    async findAll() {
        return this.userModel.find().exec();
    }

    async findOneById(id: string): Promise<UserDoc> {
        return this.userModel.findOne({ _id: id }).exec();
    }

    async findOneByUsername(username: string): Promise<UserDoc> {
        return this.userModel.findOne({ username }).exec();
    }

    async findOneByMobile(mobile: string): Promise<UserDoc> {
        return this.userModel.findOne({ mobile }).exec();
    }

    async findOneByEmail(email: string): Promise<UserDoc> {
        return this.userModel.findOne({ email }).exec();
    }

    async createUser(user): Promise<UserDoc> {
        return this.userModel.create(user)
    }

    async register(body: RegisterDTO) {
        const { username, password, repassword, mobile, email } = body;
        
        if(password !== repassword) return { code: 400, msg: '两次密码不一致!' };

        const userByName = await this.findOneByUsername(username);
        if(userByName) return { code: 400, msg: '该用户名已存在！' };

        const userByMobile = await this.findOneByMobile(mobile);
        if(userByMobile) return { code: 400, msg: '该用手机已注册！' };

        const userByEmail = await this.findOneByMobile(email);
        if(userByEmail) return { code: 400, msg: '该用邮箱已注册！' };

        const salt = makeSalt();
        const hashPassword = encryptPassword(password, salt);

        let newUser: UserDoc = await this.createUser({
            username: username,
            password: hashPassword,
            email: email,
            mobile: mobile,
            salt: salt
        });

        if(newUser){
            return {
                code: 200,
                msg: '恭喜您，注册成功！'
            };
        }else{
            return {
                code: 400,
                msg: '注册失败！'
            };
        }
    }

    async updateUser(body: any): Promise<UserDoc> {
        const { id, email, mobile } = body;
        return this.userModel.updateOne({
            _id: id
        }, {
            email: email,
            mobile: mobile
        });
    }
}
