import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
    @IsNotEmpty({ message: '用户名不能为空！' })
    @ApiProperty({description: '用户名'})
    readonly username: string;
    @IsNotEmpty({ message: '用户密码不能为空！' })
    @ApiProperty({description: '用户密码'})
    readonly password: string;
    @IsNotEmpty({ message: '再次输入密码不能为空！' })
    @ApiProperty({description: '再次输入密码'})
    readonly repassword: string;
    @IsNotEmpty({ message: '手机号码不能为空！' })
    @ApiProperty({description: '手机号'})
    readonly mobile: string;
    @IsNotEmpty({ message: '邮箱不能为空！' })
    @ApiProperty({description: '邮箱'})
    readonly email: string;
}

export class UpdateUserDTO {
    @IsNotEmpty({ message: '用户ID不能为空！' })
    @ApiProperty({description: '用户ID'})
    readonly id: string;
    @IsNotEmpty({ message: '手机号码不能为空！' })
    @ApiProperty({description: '手机号码'})
    readonly mobile: string;
    @IsNotEmpty({ message: '用户邮箱不能为空！' })
    @ApiProperty({description: '用户邮箱'})
    readonly email: string;
}

export class loginDTO {
    @IsNotEmpty({ message: '用户名不能为空！' })
    @ApiProperty({description: '用户名'})
    readonly username: string;
    @IsNotEmpty({ message: '用户密码不能为空！' })
    @ApiProperty({description: '用户密码'})
    readonly password: string;
}