import { Usuario } from '@models/Hospital/usuario.model';

export interface ResponseUsuariostDTO {
  ok: boolean;
  usuarios: Usuario[];
  total: number;
}
