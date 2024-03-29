import { createContext, PropsWithChildren, ReactNode, useContext } from 'react';

import { IconClose } from '@public/icons';
import Portal from './Portal';

interface DrawerProps {
  isOpen: boolean;
  onClose?: () => void;
}

type DrawerContextValue = DrawerProps;

const DrawerContext = createContext({} as DrawerContextValue);
const useDrawerContext = () => useContext(DrawerContext);

const Drawer = ({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<DrawerProps>) => {
  return (
    <DrawerContext.Provider value={{ isOpen, onClose }}>
      <Portal id="drawer">
        <div
          className={`absolute inset-0 z-10 transform overflow-hidden ease-in-out ${
            isOpen
              ? 'translate-x-0 scale-x-100 opacity-100 transition-opacity duration-500'
              : 'translate-x-full scale-x-0 opacity-0 transition-all delay-100 duration-500'
          }`}
        >
          <section
            className={`duration-400 absolute right-0 flex h-full w-full max-w-[43rem] transform flex-col gap-[2rem] overflow-hidden bg-white p-[2rem] shadow-bookcard transition-all ease-in-out ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {isOpen && children}
          </section>
          {/** overlay */}
          <section className="h-full w-full" onClick={onClose}></section>
        </div>
      </Portal>
    </DrawerContext.Provider>
  );
};

const DrawerHeader = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex items-center justify-between py-[0.5rem]">
      {children}
    </div>
  );
};

const DrawerContent = ({ children }: { children?: ReactNode }) => {
  return <div className="w-full text-md">{children}</div>;
};

const Title = ({ text }: { text?: string }) => {
  return (
    <h1 className="flex-grow truncate pl-[2.5rem] text-center text-md">
      {text}
    </h1>
  );
};

type Position = 'top-left' | 'top-right';

const getPositionClasses = (postion: Position) => {
  switch (postion) {
    case 'top-right':
      return 'top-[2.7rem] right-[2rem]';
    case 'top-left':
    default:
      return 'top-[2.7rem] left-[2rem]';
  }
};

const CloseButton = ({ position = 'top-left' }: { position?: Position }) => {
  const { onClose } = useDrawerContext();
  const positionClasses = getPositionClasses(position);

  return (
    <IconClose
      className={`absolute h-[2rem] w-[2rem] cursor-pointer fill-black-900 ${positionClasses}`}
      onClick={onClose}
    />
  );
};

Drawer.Header = DrawerHeader;
Drawer.Content = DrawerContent;
Drawer.Title = Title;
Drawer.CloseButton = CloseButton;

export default Drawer;
