'use client';

import {
  ChangeEventHandler,
  ForwardedRef,
  PropsWithChildren,
  TextareaHTMLAttributes,
  forwardRef,
  useState,
  ReactNode,
  isValidElement,
  Children,
} from 'react';

import ErrorMessage from '@/v1/base/ErrorMessage';
import InputLength from '@/v1/base/InputLength';

interface BaseTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  defaultValue?: string;
}
interface TextAreaProps extends BaseTextAreaProps {
  count?: boolean;
}

const _TextArea = (
  {
    maxLength = 500,
    defaultValue,
    count = false,
    error = false,
    onChange,
    children,
    ...props
  }: PropsWithChildren<TextAreaProps>,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  const [value, setValue] = useState(defaultValue || '');

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setValue(e.target.value);
    onChange && onChange(e);
  };

  return (
    <div>
      <BaseTextArea
        onChange={handleChange}
        maxLength={maxLength}
        error={error}
        ref={ref}
        {...props}
      />
      <div className="flex justify-between gap-[0.4rem]">
        {/** 에러 메세지 */}
        <div>{getErrorChildren(children)}</div>
        {/** 글자수 카운트 */}
        {count && (
          <InputLength
            currentLength={value.length}
            isError={error}
            maxLength={maxLength}
          />
        )}
      </div>
    </div>
  );
};

const TextArea = Object.assign(forwardRef(_TextArea), {
  Error: ErrorMessage,
});

const ErrorMessageType = (<ErrorMessage />).type;

const getErrorChildren = (children: ReactNode) => {
  const childrenArray = Children.toArray(children);

  return childrenArray.find(
    child => isValidElement(child) && child.type === ErrorMessageType
  );
};

export default TextArea;

const BaseTextArea = forwardRef<HTMLTextAreaElement, BaseTextAreaProps>(
  ({ placeholder, error, ...props }, ref) => {
    const borderColor = error
      ? 'border-warning-800 focus:border-warning-800'
      : 'border-black-400 focus:border-main-900';

    return (
      <textarea
        className={`min-h-[8rem] w-full resize-none rounded-[0.5rem] border-[0.05rem] p-[1rem] outline-none font-body1-regular placeholder:text-placeholder ${borderColor}`}
        placeholder={placeholder || '내용을 입력해주세요'}
        ref={ref}
        {...props}
      />
    );
  }
);

BaseTextArea.displayName = 'BaseTextArea';
