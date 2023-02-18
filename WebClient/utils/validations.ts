import * as yup from 'yup';

export const LoginFormSchema = yup
  .object()
  .shape({
    email: yup.string().email('Введите правильный email').required('Введите email'),
    password: yup.string().min(5, 'Пароль должен быть не меньше 5 символов!').required('Введите пароль')
  });

export const NewTaskSchema = yup
  .object()
  .shape({
    title: yup.string().required('Введите название карточки')
  });

export const EditTaskSchema = yup
  .object()
  .shape({
    title: yup.string().required('Введите название карточки')
  });

export const NewProjectTaskSchema = yup
  .object()
  .shape({
    name: yup.string().required('Введите название проекта')
  });