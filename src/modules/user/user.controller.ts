import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ROLE_TYPE } from 'app.config';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { AuthService } from '../auth/auth.service';
import { loginDTO, RegisterDTO, UpdateUserDTO } from './user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor (
        private readonly userService: UserService,
        private readonly authService: AuthService
    ){}

    @Get()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(ROLE_TYPE.SUPER_ADMIN)
    async findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id') id: string) {
        return this.userService.findOneById(id);
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() body: loginDTO) {
        const result = await this.authService.validateUser(body.username, body.password);

        switch(result.code){
            case 1:
                return await this.authService.certificate(result.user);
            default:
                return { code: 400, msg: result.msg };
        }
    }

    @Post('register')
    @UsePipes(ValidationPipe)
    async register(@Body() body: RegisterDTO) {
        return await this.userService.register(body);
    }

    @Post('update')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async updateUser(@Body() body: UpdateUserDTO) {
        return await this.userService.updateUser(body);
    }
}
