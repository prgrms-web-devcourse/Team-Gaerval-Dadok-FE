import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react';

type BottomActionButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'className'
>;

const BottomActionButton = (
  { children, ...props }: BottomActionButtonProps,
  ref: Ref<HTMLButtonElement>
) => {
  return (
    <div className="fixed bottom-0 left-0 z-10 w-full bg-white px-[2.0rem] py-[1.5rem]">
      <button
        ref={ref}
        className="w-full rounded-[0.5rem] bg-main-900 py-[1rem] text-lg font-bold text-white"
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default forwardRef(BottomActionButton);
