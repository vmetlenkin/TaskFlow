import React from 'react';
import { useFormContext } from "react-hook-form";

type Props = {
  name: string,
  placeholder?: string
}

const Textarea: React.FC<Props> = ({ name, placeholder = ""}) => {
  const { register, formState } = useFormContext();

  return (
    <textarea
      id={name}
      placeholder={placeholder}
      {...register(name)}
      className="w-full outline-none font-medium bg-transparent"
    />
  );
};

export default Textarea;