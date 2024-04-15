import {
  ChangeEventHandler,
  ForwardedRef,
  forwardRef,
  TextareaHTMLAttributes,
  useCallback,
  useState,
} from 'react';
import ErrorMessage from './ErrorMessage';
import InputLength from './InputLength';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  errorMessage?: string;
  // count?: boolean;
}

const CountTextArea = (
  {
    error = false,
    onChange,
    maxLength = 500,
    errorMessage,
    ...props
  }: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  const [value, setValue] = useState('');

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    e => {
      setValue(e.target.value);
      onChange?.(e);
    },
    [setValue, onChange]
  );

  return (
    <div>
      <Textarea
        onChange={handleChange}
        maxLength={maxLength}
        error={error}
        ref={ref}
        {...props}
      />
      <div className="flex flex-row-reverse justify-between gap-[0.4rem]">
        <InputLength
          currentLength={value.length}
          isError={error}
          maxLength={10}
        />
        {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
      {/* <p>
        {value.length} / {maxLength}
      </p> */}
    </div>
  );
};

export default forwardRef(CountTextArea);

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const _Textarea = (
  { placeholder, error, ...props }: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  const borderColor = error
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

export const Textarea = forwardRef(_Textarea);
