import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  error?: boolean;
}

const Input = (
  { error, children, ...props }: InputProps,
  ref: Ref<HTMLInputElement>
) => {
  const borderColor = error
    ? 'border-warning-800 focus:border-warning-800'
    : 'border-black-400 focus:border-main-900';
  return (
    <div className="text-sm">
      <input
        className={`w-full rounded-[0.5rem] border-[0.05rem] px-[1rem] py-[1.3rem] outline-none ${borderColor}`}
        {...props}
        ref={ref}
      />
      {children}
    </div>
  );
};

export default forwardRef(Input);
