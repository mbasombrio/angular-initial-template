import { Usuario } from '@models/Hospital/usuario.model';

export interface renewTokenInterface {
  ok: boolean;
  token: string;
  msg?: string;
  user: Usuario
}
