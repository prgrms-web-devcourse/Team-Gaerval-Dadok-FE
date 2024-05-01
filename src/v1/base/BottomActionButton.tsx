import { ComponentPropsWithoutRef } from 'react';
import Button from './Button';

type BottomActionButtonProps = Omit<
  ComponentPropsWithoutRef<typeof Button>,
  'className'
>;

const BottomActionButton = ({
  children,
  ...props
}: BottomActionButtonProps) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 mx-auto w-full max-w-[43rem] bg-white px-[2.0rem] py-[1.5rem]">
      <Button size="full" {...props}>
        {children}
      </Button>
    </footer>
  );
};

export default BottomActionButton;
