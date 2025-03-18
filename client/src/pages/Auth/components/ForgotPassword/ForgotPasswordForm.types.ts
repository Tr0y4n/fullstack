import { SubmitHandler } from 'react-hook-form';
import { ForgotPasswordFormInputs } from '../index.types';

export interface ForgotPasswordFormProps {
  onSubmit: SubmitHandler<ForgotPasswordFormInputs>;
  toggleLogin: () => void;
}
