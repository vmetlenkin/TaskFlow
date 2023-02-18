import React from 'react';

type Props = {
  children: React.ReactNode,
  color?: 'indigo' | 'green' | 'red'
  size?: 'sm' | 'md' | 'lg',
  full?: boolean,
  onClick?: () => void,
  type?: 'submit' | 'button'
}

const Button: React.FC<Props> = (props) => {
  const {
    type = 'submit',
    children,
    color = 'indigo',
    size = 'md',
    full,
    onClick
  } = props;

  const style = {
    color: {
      'indigo': 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300',
      'green': 'bg-green-600 hover:bg-green-700 focus:ring-green-300',
      'red': 'bg-red-500 hover:bg-red-600 focus:ring-red-300'
    },
    size: {
      'sm': 'px-5 py-2.5',
      'md': 'px-5 py-2.5',
      'lg': 'px-20 py-5'
    },
    full: 'w-full'
  };
  
  return (
    <button onClick={onClick} type={type} className={`${style.color[color]} ${style.size[size]} ${full && style.full} text-white 
      font-medium rounded-md text-sm focus:ring-4 focus:outline-none`}> 
      {children}
    </button>
  );
};

export default Button;