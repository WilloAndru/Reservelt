export interface UserModel {
  id: number;
  uid: string;
  name: string;
  email: string;
  photoUrl?: string;
  role: 'client' | 'admin';
}
