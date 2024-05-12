import {
  createContext,
  Fragment,
  PropsWithChildren,
  ReactNode,
  useContext,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { IconClose } from '@public/icons';
import useRemoveVerticalScroll from '@/hooks/useRemoveVerticalScroll';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type DrawerContextValue = DrawerProps;

const DrawerContext = createContext({} as DrawerContextValue);
const useDrawerContext = () => useContext(DrawerContext);

const Drawer = ({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<DrawerProps>) => {
  useRemoveVerticalScroll({ enabled: isOpen });

  return (
    <DrawerContext.Provider value={{ isOpen, onClose }}>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog className="relative z-10" onClose={onClose}>
          {/** overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className=" fixed inset-0 bg-black-900/50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div
                className={`pointer-events-none fixed inset-y-0 right-0 flex w-full max-w-full justify-center`}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-600"
                  enterFrom="translate-x-full opacity-0"
                  enterTo="translate-x-0 opacity-1"
                  leave="transform transition ease-in-out duration-500 sm:duration-600"
                  leaveFrom="translate-x-0 opacity-1"
                  leaveTo="translate-x-full opacity-0"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-[43rem]">
                    <div
                      className={`flex h-full flex-col overflow-y-scroll bg-white pt-6 shadow-xl`}
                    >
                      {children}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </DrawerContext.Provider>
  );
};

const DrawerHeader = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex items-center justify-between px-6 py-[0.5rem] sm:px-8">
      {children}
    </div>
  );
};

const DrawerContent = ({ children }: { children?: ReactNode }) => {
  return <div className="w-full px-6 pt-6 text-md sm:px-8">{children}</div>;
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
