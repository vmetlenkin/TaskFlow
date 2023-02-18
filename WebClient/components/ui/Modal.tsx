import React from 'react';
import Badge from './Badge';
import {XMarkIcon} from "@heroicons/react/20/solid";

type SubComponents = {
  Content: typeof Content,
  Footer: typeof Footer
}

type Props = {
  title?: string,
  children: React.ReactNode,
  show?: boolean,
  onClose?: () => void
}

const Modal: React.FC<Props> & SubComponents = (props) => {
  const { 
    title, 
    children, 
    show = true, 
    onClose 
  } = props;
  
  return (
    <div>
      <div className={`${show ? 'fixed' : 'hidden'} flex justify-center items-center bg-black bg-opacity-50 
        overflow-y-auto overflow-x-hiddenx top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full backdrop-blur-sm`}
      >
        <div className="relative w-full max-w-2xl h-full md:h-auto">
          <div className="relative bg-white dark:bg-zinc-900 rounded-md shadow">
            {(title || onClose) && (
              <div className="flex justify-between items-center py-4 pl-6 pr-4 rounded-t">
                {title && <Badge>{title}</Badge>}
                {onClose && (
                  <button type="button" onClick={onClose} className="text-gray-400 bg-transparent 
                    hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm p-1.5 ml-auto inline-flex items-center"
                  >
                    <XMarkIcon className="w-6 h-6" />
                    <span className="sr-only">Закрыть окно</span>
                  </button>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const Content = ({ children }) => {
  return <div className="px-6 space-y-6">{children}</div>;
};

const Footer = ({ children }) => {
  return <div className="p-6">{children}</div>;
};

Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;