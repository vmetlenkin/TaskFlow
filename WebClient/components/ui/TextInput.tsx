import React from 'react';

type Props = {
  id: string,
  type: 'text' | 'email' | 'password',
  required?: boolean,
  label: string
}

const TextInput: React.FC<Props> = (props) => {
  return (
    <div className="relative z-0 mb-6 w-full group">
      <input type={props.type} name={props.id} id={props.id} className="block py-2.5 px-0 w-full font-medium 
        text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none 
        focus:ring-0 focus:border-blue-600 peer" placeholder=" " required={props.required} />
      <label htmlFor={props.id} className="peer-focus:font-medium absolute text-gray-500 duration-300 transform 
        -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
         peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
         peer-focus:-translate-y-6"
      >
        {props.label}
      </label>
    </div>
  );
};

export default TextInput;