import { SubmitHandler } from 'react-hook-form';
import { LoginFormInputs } from '../index.types';

export interface LoginFormProps {
  // onSubmit: SubmitHandler<LoginFormInputs>;
  toggleForgotPassword: () => void;
  toggleRegister: () => void;
}
