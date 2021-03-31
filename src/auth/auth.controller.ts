/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { CredentialsDto } from './dtos/credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { GetUser } from './get-user.decorator';
import { ChangePasswordDto } from './dtos/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(

    @Body(ValidationPipe) createUserDto: CreateUserDto,

  ): Promise<{ message: string }> {

    await this.authService.signUp(createUserDto);

    return {
      message: 'Cadastro realizado com sucesso',
    };
  }

  @Post('/signin')
  async signIn(

    @Body(ValidationPipe) credentiaslsDto: CredentialsDto,

  ): Promise<{ token: string }> {

    return await this.authService.signIn(credentiaslsDto);
  }

  @Patch(':token')
  async confirmEmail(@Param('token') token: string) {

    await this.authService.confirmEmail(token);

    return {
      message: 'Email confirmado',
    };
  }

  @Post('/send-recover-email')
  async sendRecoverPasswordEmail(

    @Body('email') email: string,

  ): Promise<{ message: string }> {

    await this.authService.sendRecoverPasswordEmail(email);

    return {
      message: 'Foi enviado um email com instruções para resetar sua senha',
    };
  }

  @Patch('/reset-password/:token')
  async resetPassword(

    @Param('token') token: string,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,

  ): Promise<{ message: string }> {

    await this.authService.resetPassword(token, changePasswordDto);

    return {
      message: 'Senha alterada com sucesso',
    };
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  
  getMe(@GetUser() user: User): User {
    return user;
  }
}