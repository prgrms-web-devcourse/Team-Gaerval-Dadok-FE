'use client';

import {
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  Ref,
  useEffect,
  useState,
} from 'react';

import { formatDateInputValue } from '@/utils/date';

import { IconSelect } from '@public/icons';

interface DatePickerProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'id' | 'className'
  > {
  defaultValue?: string;
}

const DatePicker = (
  {
    name,
    onChange,
    disabled = false,
    defaultValue = '',
    ...props
  }: DatePickerProps,
  ref: Ref<HTMLInputElement>
) => {
  const [currentDate, setCurrentDate] = useState(defaultValue);

  const disabledClasses = disabled
    ? 'text-black-500 cursor-not-allowed [&_svg]:fill-black-500'
    : 'text-black-900 cursor-pointer [&_svg]:fill-black-900';

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCurrentDate(event.target.value);
    onChange && onChange(event);
  };

  useEffect(() => {
    if (defaultValue) return;

    const $date = document.querySelector(`input#${name}`) as HTMLInputElement;

    if (!$date) return;
    setCurrentDate($date.value);
  }, [defaultValue, name]);

  return (
    <label
      className={`relative flex h-[3rem] max-w-[14rem] items-center justify-between bg-transparent ${disabledClasses}`}
      htmlFor={name}
    >
      <div className="flex h-full min-w-0 flex-grow items-center">
        <input
          id={name}
          name={name}
          ref={ref}
          type="date"
          className="h-full w-0"
          disabled={disabled}
          defaultValue={currentDate}
          onChange={handleInputChange}
          {...props}
        />
        <p
          className={`truncate text-sm ${
            currentDate ? 'text-inherit' : 'text-placeholder'
          }`}
        >
          {currentDate
            ? formatDateInputValue(currentDate)
            : '날짜를 선택해주세요'}
        </p>
      </div>
      <IconSelect className={`h-[1.2rem] w-[1.2rem] flex-shrink-0`} />
    </label>
  );
};

export default forwardRef(DatePicker);
