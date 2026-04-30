import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioLogin } from './usuario.login';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() usuarioLogin: UsuarioLogin) {
    return this.authService.login(usuarioLogin);
  }
}