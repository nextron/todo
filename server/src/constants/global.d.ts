// globals.ts
export interface User {
  _id: string;
  email: string;
  password?: string;
  full_name: string;
  username?: string;
  age: string;
  createdAt?: Date;
  updatedAt?: Date;
}
