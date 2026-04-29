import * as bcrypt from 'bcrypt';

export async function criptografarSenha(senha: string): Promise<string> {
  return await bcrypt.hash(senha, 10);
}

export async function compararSenha(
  senha: string,
  senhaHash: string,
): Promise<boolean> {
  return await bcrypt.compare(senha, senhaHash);
}