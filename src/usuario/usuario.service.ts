import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { criptografarSenha } from '../auth/bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
    });

    if (!usuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    return usuario;
  }

  async findByUsuario(usuario: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
      where: { usuario: usuario },
    });
  }

  async findByNome(nome: string): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      where: {
        nome: Like(`%${nome}%`),
      },
    });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const usuarioExiste = await this.findByUsuario(usuario.usuario);

    if (usuarioExiste) {
      throw new HttpException('Usuário já existe!', HttpStatus.BAD_REQUEST);
    }

    usuario.senha = await criptografarSenha(usuario.senha);

    return await this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    await this.findById(usuario.id);

    usuario.senha = await criptografarSenha(usuario.senha);

    return await this.usuarioRepository.save(usuario);
  }
}