import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255, nullable: false })
  nome!: string;

  @Column({ length: 255, nullable: false })
  usuario!: string;

  @Column({ length: 255, nullable: false })
  senha!: string;

  @Column({ length: 5000, nullable: true })
  foto!: string;
}