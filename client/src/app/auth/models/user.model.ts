export interface AppUser {
  id: number;
  uid: string;
  name: string;
  lastName: string;
  email: string;
  photoUrl?: string;
  role: 'client' | 'admin';
}
