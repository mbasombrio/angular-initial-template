export interface ResponseCreateUser {
  ok: boolean;
  usuario: {
    nombre: string;
    email: string;
    role: string;
    google: boolean;
    uid: string;
  };
  token: string;
}
