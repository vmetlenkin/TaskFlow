import React from 'react';

type Props = {
  children: React.ReactNode
};

const Alert: React.FC<Props> = ({ children }) => {
  return (
    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-md"
         role="alert">
      <span className="font-medium">{children}</span>
    </div>
  );
};

export default Alert;