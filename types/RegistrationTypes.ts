export interface UserFormData {
  username: string;
  password: string;
  email?: string;
  role?: string;
  name: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  _v?: string;
  dateOfBirth: Date | null;
}

export type UserRegistrationResponse = {
  message: string;
  data: UserFormData;
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
  status?: boolean;
  message?: string;
  data?: UserFormData | DoctorFormData;
};
