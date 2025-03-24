export interface LoginFormInputs {
  login: string;
  password: string;
}

export interface ForgotPasswordFormInputs {
  login: string;
}

export interface RegisterFormInputs {
  login: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  admin: boolean;
}
