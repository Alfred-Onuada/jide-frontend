export interface UserFormData {
  username?: string;
  fullName?: string;
  matricNo?: string;
  password?: string;
  hospitalCardNo?: string;
  confirmPassword?: string;
  email?: string;
  role?: string;
  name?: string;
  gender?: string;
  _id?: string;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
  _v?: string;
  dateOfBirth?: Date | null;
  address?: string;
}

export type UserRegistrationResponse = {
  status: boolean;
  message: string;
  data?: UserFormData;
};

export interface DoctorFormData {
  username: string;
  password: string;
  email: string;
  name: string;
  hospital: string;
  qualification: string;
  specialization: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: boolean;
  message?: string;
  data?: UserFormData | DoctorFormData;
};
