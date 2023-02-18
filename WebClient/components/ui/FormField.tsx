import React from 'react';
import { useFormContext } from 'react-hook-form';

const style = {
  input: (error) =>
    `${error ? 'border-red-600' : 'border-gray-300 focus:border-rose-500 focus:ring-rose-500'} block py-2.5 px-0 w-full 
        font-medium text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none 
        focus:ring-0 focus:border-blue-600 peer text-sm dark:text-white dark:border-gray-600 dark:focus:border-blue-500`,
  label: (error) => `${error ? 'text-red-600' : 'text-gray-700'} block text-sm font-sm`
}

type Props = {
  name: string,
  label?: string,
  type?: 'text' | 'password' | 'email'
}

const FormField: React.FC<Props> = ({ name, label, type = 'text' }) => {
  const { register, formState } = useFormContext();

  const error = formState.errors[name];
  
  return (
    <div>
      <div className="relative z-0 mb-6 w-full group">
        <input
          id={name}
          type={type}
          className={style.input(error)}
          placeholder=" "
          {...register(name)}
        />
        <label htmlFor={name} className="absolute text-sm text-gray-500 duration-300 transform 
          -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
           peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
           peer-focus:-translate-y-6 font-medium"
        >
          {label}
        </label>
        <div className="text-red-600 text-sm mt-1">{error?.message}</div>
      </div>
    </div>
  );
};

export default FormField;