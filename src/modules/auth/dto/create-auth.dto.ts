import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuthDto {
    @ApiProperty()
    @IsNotEmpty({message: '用户名不能为空'})
    readonly name: string | number;
    @ApiProperty()
    @IsNotEmpty({message: '密码不能为空'})
    readonly password: string;
    @ApiProperty()
    @IsNotEmpty({message: '邮箱不能为空'})
    @IsString()
    readonly email: string;
    @ApiPropertyOptional()
    readonly job?: string;
}