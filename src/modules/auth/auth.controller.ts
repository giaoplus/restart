import { Controller, Get, Req, Post, Param, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './interfaces/auth.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Get()
    async findAll(): Promise<Auth[]> {
        return this.authService.findAll();
    }

    @Get(':name')
    async findOne(@Param('name') name: string): Promise<Auth> {
        return this.authService.findOne(name);
    }

    @Post()
    create(@Body() createAuthDto: CreateAuthDto) {
        this.authService.create(createAuthDto);
    }
}
