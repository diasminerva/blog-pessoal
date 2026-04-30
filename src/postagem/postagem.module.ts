import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './entities/postagem.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { PostagemService } from './postagem.service';
import { PostagemController } from './postagem.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem, Usuario])],
  controllers: [PostagemController],
  providers: [PostagemService],
})
export class PostagemModule {}