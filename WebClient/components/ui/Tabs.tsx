import React from 'react';
import Link from 'next/link';

export interface Tab {
  name: string,
  link: string,
  active: boolean,
  text: string
}

type Props = {
  tabs: Tab[]
}

const Tabs: React.FC<Props> = ({ tabs }) => {
  return (
    <div className="border-gray-200">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
        {tabs.map(tab => (
          <li key={tab.text} className="mr-2">
            <Link 
                href={tab.link} 
                className={`${tab.active ? 'border-blue-600 active text-blue-600' : 'hover:text-gray-600 hover:border-gray-300 border-transparent'} inline-flex p-4 dark:text-white rounded-t-lg border-b-4 group`}>
              <svg 
                aria-hidden="true" 
                className={`${tab.active ? 'text-blue-600' : 'text-gray-600'} mr-2 w-5 h-5 dark:text-white`} 
                fill="currentColor"
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 
                  002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 
                  01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              {tab.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;