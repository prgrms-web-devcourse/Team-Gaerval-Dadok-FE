import { Dialog, Transition } from '@headlessui/react';
import { Fragment, PropsWithChildren } from 'react';

interface BottomSheetProps {
  isShow?: boolean;
  onClose: () => void;
}

const BottomSheet = ({
  isShow = false,
  onClose,
  children,
}: PropsWithChildren<BottomSheetProps>) => {
  return (
    <Transition.Root show={isShow} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-overlay/60 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed bottom-0 left-1/2 flex max-w-full -translate-x-1/2">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <Dialog.Panel className="pointer-events-auto relative max-h-[100dvh] w-[43rem] rounded-t-[1.5rem] bg-white px-[1rem] py-[1.5rem]">
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default BottomSheet;
