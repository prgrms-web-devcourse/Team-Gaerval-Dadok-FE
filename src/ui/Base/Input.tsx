import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  error?: FieldError;
}

const Input = ({ error, ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
  const borderColor = error
    ? 'border-warning-800 focus:border-warning-800'
    : 'border-black-400 focus:border-main-900';
  return (
    <div className="flex flex-col gap-[0.5rem] text-sm">
      <input
        className={`w-full rounded-[0.5rem] border-[0.05rem] px-[1rem] py-[1.3rem] outline-none ${borderColor}`}
        {...props}
        ref={ref}
      />
      {/* TODO: 에러 메시지 컴포넌트로 교체 */}
      {error && <div className="text-warning-800">{error.message}</div>}
    </div>
  );
};

export default forwardRef(Input);
