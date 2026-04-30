import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Postagem } from './entities/postagem.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      relations: {
        usuario: true,
      },
    });
  }

  async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: { id },
      relations: {
        usuario: true,
      },
    });

    if (!postagem) {
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
    }

    return postagem;
  }

  async findByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      where: {
        titulo: Like(`%${titulo}%`),
      },
      relations: {
        usuario: true,
      },
    });
  }

  async create(postagem: Postagem): Promise<Postagem> {
    if (!postagem.usuario || !postagem.usuario.id) {
      throw new HttpException('Usuário é obrigatório!', HttpStatus.BAD_REQUEST);
    }

    const usuario = await this.usuarioRepository.findOne({
      where: { id: postagem.usuario.id },
    });

    if (!usuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    postagem.data = new Date();

    return await this.postagemRepository.save(postagem);
  }

  async update(postagem: Postagem): Promise<Postagem> {
    await this.findById(postagem.id);

    if (!postagem.usuario || !postagem.usuario.id) {
      throw new HttpException('Usuário é obrigatório!', HttpStatus.BAD_REQUEST);
    }

    const usuario = await this.usuarioRepository.findOne({
      where: { id: postagem.usuario.id },
    });

    if (!usuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    postagem.data = new Date();

    return await this.postagemRepository.save(postagem);
  }

  async delete(id: number): Promise<void> {
    await this.postagemRepository.delete(id);
  }
}