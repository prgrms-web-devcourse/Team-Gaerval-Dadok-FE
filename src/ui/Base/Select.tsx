import { forwardRef, PropsWithChildren, ReactNode, Ref } from 'react';
import { Listbox } from '@headlessui/react';
import SelectIcon from '@public/icons/select-icon.svg';

type Error = {
  message: string;
};

interface SelectProps {
  placeholder?: string;
  error?: Error;
}

const Select = (
  { placeholder = '', children }: PropsWithChildren<SelectProps>,
  ref: Ref<HTMLElement>
) => {
  return (
    <Listbox ref={ref}>
      <Listbox.Button className="relative flex w-full items-center rounded-[0.5rem] border-[0.05rem] border-black-400 px-[1rem] py-[1.3rem] text-sm data-[headlessui-state=open]:border-main-900">
        {({ value }) => (
          <>
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
          </>
        )}
      </Listbox.Button>
      {children && (
        <Listbox.Options className="mt-[1rem]">{children}</Listbox.Options>
      )}
    </Listbox>
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
      className="cursor-pointer rounded-[0.5rem] px-[1rem] py-[1.3rem] text-sm hover:bg-main-900 hover:text-white"
    >
      {children}
    </Listbox.Option>
  );
};

const ExportSelect = Object.assign(forwardRef(Select), { Option });

export default ExportSelect;
