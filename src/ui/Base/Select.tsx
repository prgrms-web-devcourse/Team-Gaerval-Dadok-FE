import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  Fragment,
  PropsWithChildren,
  ReactNode,
  Ref,
} from 'react';
import { Listbox } from '@headlessui/react';
import SelectIcon from '@public/icons/select-icon.svg';
import { FieldError } from 'react-hook-form';

interface SelectProps {
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: FieldError;
}

const Select = (
  {
    placeholder = '',
    error,
    children,
    ...props
  }: PropsWithChildren<SelectProps>,
  ref: Ref<HTMLElement>
) => {
  const borderColor = error
    ? 'border-warning-800'
    : 'border-black-400 data-[headlessui-state=open]:border-main-900';

  return (
    <div className="flex flex-col gap-[0.5rem] text-sm">
      <Listbox as="div" {...props} ref={ref} className="relative">
        <Listbox.Button as={Fragment}>
          {({ value }) => (
            <button
              className={`relative flex w-full items-center rounded-[0.5rem] border-[0.05rem] px-[1rem] py-[1.3rem] ${borderColor}`}
            >
              {value ? (
                <div className="min-h-[2.1rem] w-full pr-[2.35rem] text-left">
                  {value}
                </div>
              ) : (
                <div className="min-h-[2.1rem] w-full pr-[2.35rem] text-left text-placeholder">
                  {placeholder}
                </div>
              )}
              <SelectIcon className="absolute right-[1.35rem]" />
            </button>
          )}
        </Listbox.Button>
        {children && (
          <div className="absolute z-10 w-full">
            <Listbox.Options className=" my-[0.5rem] rounded-[0.5rem] bg-white shadow-md">
              {children}
            </Listbox.Options>
          </div>
        )}
      </Listbox>
      {error && <div className="text-warning-800">{error.message}</div>}
    </div>
  );
};

interface OptionProps {
  value: unknown;
  children: ReactNode;
}

const Option = ({ value, children }: OptionProps) => {
  return (
    <Listbox.Option
      value={value}
      className="cursor-pointer rounded-[0.5rem] px-[1rem] py-[1.3rem] hover:bg-main-900 hover:font-bold hover:text-white"
    >
      {children}
    </Listbox.Option>
  );
};

const ExportSelect = Object.assign(forwardRef(Select), { Option });

export default ExportSelect;
