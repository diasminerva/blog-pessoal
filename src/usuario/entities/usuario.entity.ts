import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  nome!: string;

  @Column({ length: 255 })
  usuario!: string;

  @Column({ length: 255 })
  senha!: string;

  @Column({ length: 5000, nullable: true })
  foto!: string;

  @OneToMany(() => Postagem, (postagem) => postagem.usuario)
  postagens!: Postagem[];
}