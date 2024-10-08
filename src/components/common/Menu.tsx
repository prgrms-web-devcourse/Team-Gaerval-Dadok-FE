'use client';

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { IconHamburger } from '@public/icons';
import useOutsideClickRef from '@/hooks/useOutsideClickRef';

import BottomSheet from '@/components/common/BottomSheet';

type MenuContextValue = {
  isOpen: boolean;
  toggle: () => void;
};

const MenuContext = createContext({} as MenuContextValue);

const Menu = ({ children }: { children?: React.ReactNode }) => {
  const [isOpen, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen(prev => !prev), []);

  const ref = useOutsideClickRef<HTMLDivElement>(() => setOpen(false));
  const value = useMemo(() => ({ isOpen, toggle }), [isOpen, toggle]);

  return (
    <div className="relative" ref={ref}>
      <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
    </div>
  );
};

const Toggle = () => {
  const { toggle } = useContext(MenuContext);

  return (
    <div
      className="flex h-[2.3rem] w-[2.3rem] cursor-pointer items-center justify-center"
      onClick={toggle}
    >
      <IconHamburger className="h-[2rem] w-[2rem] hover:fill-black-500" />
    </div>
  );
};

const BottomSheetList = ({ children }: { children?: React.ReactNode }) => {
  const { isOpen, toggle } = useContext(MenuContext);

  return (
    <BottomSheet isShow={isOpen} onClose={toggle}>
      {children}
    </BottomSheet>
  );
};

const DropdownList = ({ children }: { children?: React.ReactNode }) => {
  const { isOpen, toggle } = useContext(MenuContext);

  return (
    <>
      {isOpen && (
        <>
          {/** overlay */}
          <div className="fixed inset-0 z-50 bg-overlay/60" onClick={toggle} />
          <ul className="absolute right-0 top-[3rem] z-50 min-w-[10rem] rounded-[0.5rem] bg-white py-[0.5rem] shadow-[0_0_15px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.1)]">
            {children}
          </ul>
        </>
      )}
    </>
  );
};

const Item = ({
  onSelect,
  children,
}: PropsWithChildren<{ onSelect?: () => void }>) => {
  const { toggle } = useContext(MenuContext);

  const handleItemClick = () => {
    toggle();
    onSelect && onSelect();
  };

  return (
    <li
      className="flex cursor-pointer select-none list-none flex-col truncate whitespace-nowrap rounded-[0.5rem] px-[1rem] pt-[1rem] font-body1-regular after:mt-[1rem] after:block after:h-[0.1rem] after:w-full after:bg-black-300 last:after:w-0 hover:bg-black-100"
      onClick={handleItemClick}
    >
      {children}
    </li>
  );
};

Menu.Toggle = Toggle;
Menu.BottomSheetList = BottomSheetList;
Menu.DropdownList = DropdownList;
Menu.Item = Item;

export default Menu;
