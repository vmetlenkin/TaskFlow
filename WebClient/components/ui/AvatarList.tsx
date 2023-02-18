import React from 'react';
import {PlusIcon} from "@heroicons/react/20/solid";

type Props = {
  text: string;
  size?: 'sm' | 'normal';
  onAdd?: () => void;
}

const AvatarList: React.FC<Props> = (props) => {
  const {
    text,
    onAdd,
    size = 'normal'
  } = props;
  
  const style = {
    size: {
      'sm': 'w-10 h-10',
      'normal': 'w-10 h-10' 
    }
  }
  
  return (
    <div className="flex -space-x-4">
      <div
        className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">{text}</span>
      </div>

      {props.onAdd && (
        <div className={`${style.size[size]} inline-flex border cursor-pointer overflow-hidden relative justify-center 
          items-center bg-white hover:bg-gray-50 rounded-full`} onClick={onAdd}
        >
          <span className="font-medium text-gray-600">
            <PlusIcon className="w-6 h-6" />
          </span>
        </div>
      )}
      
    </div>
  );
};

export default AvatarList;