import React, { useState } from 'react';
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  placeholder?: string;
}

const FormHeadingInput: React.FC<Props> = ({ name, placeholder = "" }) => {
  const { register, formState } = useFormContext();
  
  return (
    <input
      type="text"
      id={name}
      placeholder={placeholder}
      {...register(name)}
      className="text-2xl font-semibold outline-none w-full mb-2 bg-transparent"
    />
  );
};

export default FormHeadingInput;