import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react';
import ErrorMessage from './ErrorMessage';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  errorMessage?: string;
}

const Input = (
  { errorMessage, ...props }: InputProps,
  ref: Ref<HTMLInputElement>
) => {
  const borderColor = errorMessage
    ? 'border-warning-800 focus:border-warning-800'
    : 'border-black-400 focus:border-main-900';
  return (
    <div className="flex flex-col gap-[0.5rem] text-sm">
      <input
        className={`w-full rounded-[0.5rem] border-[0.05rem] px-[1rem] py-[1.3rem] outline-none ${borderColor}`}
        {...props}
        ref={ref}
      />
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </div>
  );
};

const ExportInput = Object.assign(forwardRef(Input), { ErrorMessage });

export default ExportInput;
