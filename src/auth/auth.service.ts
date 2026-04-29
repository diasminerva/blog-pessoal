import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private usuarioService: UsuarioService) {}

  async login(usuarioLogin: any) {

    const usuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario);

    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const senhaValida = await compare(usuarioLogin.senha, usuario.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('Senha inválida');
    }

    return {
      id: usuario.id,
      usuario: usuario.usuario,
      nome: usuario.nome,
      token: 'fake-token-aqui'
    };
  }
}