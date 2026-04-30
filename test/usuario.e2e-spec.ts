import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { AppModule } from '../src/app.module';

describe('Testes do Usuário (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let usuarioId: number;

  const emailTeste = `minerva${Date.now()}@email.com`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('01 - Deve cadastrar um usuário', async () => {
    const response = await request(app.getHttpServer())
      .post('/usuarios')
      .send({
        nome: 'Minerva',
        usuario: emailTeste,
        senha: '123456',
        foto: '',
      });

    expect(response.status).toBe(201);
    usuarioId = response.body.id;
  });

  it('02 - Deve autenticar usuário', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        usuario: emailTeste,
        senha: '123456',
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();

    token = response.body.token;
  });

  it('03 - Não deve cadastrar usuário duplicado', async () => {
    const response = await request(app.getHttpServer())
      .post('/usuarios')
      .send({
        nome: 'Minerva',
        usuario: emailTeste,
        senha: '123456',
        foto: '',
      });

    expect(response.status).toBe(400);
  });

  it('04 - Deve listar todos os usuários', async () => {
    const response = await request(app.getHttpServer())
      .get('/usuarios')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('05 - Deve atualizar um usuário', async () => {
    const response = await request(app.getHttpServer())
      .put('/usuarios')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: usuarioId,
        nome: 'Minerva Atualizada',
        usuario: emailTeste,
        senha: '123456',
        foto: '',
      });

    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});