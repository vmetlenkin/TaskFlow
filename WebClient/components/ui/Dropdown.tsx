import React, { useState } from 'react';
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center p-2 text-sm font-medium text-center 
        text-gray-900 rounded-md hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-gray-50" type="button"
      >
        <EllipsisHorizontalIcon className="w-5 h-5" />
      </button>
      <div className={`${isOpen ? 'absolute' : 'hidden'} z-10 right-0 mt-1 w-44 bg-white rounded divide-y 
        divide-gray-100 shadow`}
      >
        <ul className="py-1 text-sm text-gray-700">
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-100">Настройки</a>
          </li>
        </ul>
        <div className="py-1">
          <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Удалить</a>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;