import React from 'react';

type Props = {
  children: React.ReactNode,
  color?: 'indigo' | 'green' | 'red',
  close?: boolean
}

const Badge: React.FC<Props> = (props) => {
  const {
    children,
    color = 'indigo'
  } = props;
  
  const theme = {
    'indigo': 'bg-indigo-100 text-indigo-800',
    'green': 'bg-green-100 text-green-800',
    'red': 'bg-red-100 text-red-800'
  }
  
  return (
    <span className={`${theme[color]} inline-flex text-sm font-medium mr-2 px-2 py-1 rounded-md dark:bg-transparent 
      dark:text-white dark:border dark:border-gray-600`}>
      {children}
      {props.close && (
        <button type="button" className="inline-flex items-center p-0.5 ml-2 text-sm bg-transparent 
          rounded-sm hover:bg-blue-200 hover:text-blue-900"
        >
          <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 
             111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 
             10 4.293 5.707a1 1 0 010-1.414z"></path></svg>
          <span className="sr-only">Remove badge</span>
        </button>
      )}
    </span>
  );
};

export default Badge;