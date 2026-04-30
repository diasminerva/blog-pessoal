import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity({ name: 'tb_postagens' })
export class Postagem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  titulo!: string;

  @Column({ length: 500 })
  texto!: string;

  @Column()
  data!: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.postagens)
  usuario!: Usuario;
}