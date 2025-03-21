import * as yup from 'yup';

export const loginSchema = yup.object({
  login: yup.string().required('Обязательное поле').max(25, 'Максимум 25 символов'),
  password: yup.string().min(4, 'Минимум 4 символа').required('Обязательное поле'),
});

export const forgotPasswordSchema = yup.object({
  login: yup.string().required('Обязательное поле').max(25, 'Максимум 25 символов'),
});

export const registerSchema = yup.object({
  email: yup.string().required('Обязательное поле').max(25, 'Максимум 25 символов'),
  firstName: yup.string().required('Обязательное поле').max(25, 'Максимум 25 символов'),
  lastName: yup.string().required('Обязательное поле').max(25, 'Максимум 25 символов'),
  login: yup.string().required('Обязательное поле').max(25, 'Максимум 25 символов'),
  password: yup.string().min(4, 'Минимум 4 символа').required('Обязательное поле'),
});
