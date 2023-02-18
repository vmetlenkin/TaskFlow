import React, {useState} from 'react';
import Button from "../components/ui/Button";
import Link from "next/link";
import { useAppDispatch } from "../redux/hooks";
import {FormProvider, useForm} from "react-hook-form";
import {setCookie} from "nookies";
import {setUserData} from "../redux/slices/user";
import FormField from "../components/ui/FormField";
import Alert from "../components/ui/Alert";
import {useRouter} from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import {LoginFormSchema} from "../utils/validations";
import { UserApi } from "../redux/api/user-api";

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema)
  });

  const [error, setError] = useState('');

  const onSubmit = async (dto: any) => {
    try {
      const data = await UserApi.login(dto);
      setCookie(null, 'token', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      });
      setError('');
      dispatch(setUserData(data));
      await router.push('/projects');
    } catch (err: any) {
      setError(err.response.data.title);
      console.warn(err);
    }
  }
  
  return (
    <section className="bg-gray-50 dark:bg-zinc-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          TaskFlow
        </a>
        <div
          className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 dark:bg-zinc-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Вход в аккаунт
            </h1>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" method="POST">
                  <FormField name="email" label="Email" type="email" />
                  <FormField name="password" label="Пароль" type="password" />
                  {error && <Alert>{error}</Alert>}
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input 
                          id="remember" 
                          aria-describedby="remember" 
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 
                            focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 
                            dark:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Запомнить меня</label>
                      </div>
                    </div>
                    <a 
                      href="#" 
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Забыли пароль?
                    </a>
                  </div>
                  <Button full>Войти</Button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Нет аккаунта? <Link href="/registration" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Зарегистрироваться</Link>
                  </p>
                </form>
              </FormProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;