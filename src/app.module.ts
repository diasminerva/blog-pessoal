import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

import { Usuario } from './usuario/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Usuario],
      synchronize: true,
    }),

    UsuarioModule,
    AuthModule,
  ],
})
export class AppModule {}