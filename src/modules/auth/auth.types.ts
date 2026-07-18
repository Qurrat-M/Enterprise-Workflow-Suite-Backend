export interface RegisterUserDto {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
  is_active: boolean;
}
