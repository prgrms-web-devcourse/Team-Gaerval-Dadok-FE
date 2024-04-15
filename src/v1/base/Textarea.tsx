import { ForwardedRef, forwardRef, TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isError?: boolean;
  isCount?: boolean;
}

const Textarea = (
  { placeholder, isError, ...props }: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  const borderColor = isError
    ? 'border-warning-800 focus:border-warning-800'
    : 'border-black-400 focus:border-main-900';

  return (
    <textarea
      className={`min-h-[8rem] w-full resize-none rounded-[0.5rem] border-[0.05rem] p-[1rem] text-sm outline-none placeholder:text-placeholder ${borderColor}`}
      placeholder={placeholder || '내용을 입력해주세요'}
      ref={ref}
      {...props}
    />
  );
};

export default forwardRef(Textarea);
