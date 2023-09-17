import { ComponentPropsWithoutRef } from 'react';
import Button from './Button';

type BottomActionButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'className'
>;

const BottomActionButton = ({
  children,
  ...props
}: BottomActionButtonProps) => {
  return (
    <div className="fixed bottom-0 left-0 z-10 w-full bg-white px-[2.0rem] py-[1.5rem]">
      <Button size="full" {...props}>
        {children}
      </Button>
    </div>
  );
};

export default BottomActionButton;
