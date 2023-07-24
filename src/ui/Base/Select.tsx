import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react';

interface SelectProps
  extends Omit<
    ComponentPropsWithoutRef<'select'>,
    'className' | 'defaultValue' | 'requirder'
  > {
  errorMessage?: string;
}

const Select = (
  { errorMessage, children, placeholder, ...props }: SelectProps,
  ref: Ref<HTMLSelectElement>
) => {
  const borderColor = errorMessage
    ? 'border-warning-800'
    : 'border-black-400 focus:border-main-900';

  return (
    <div className="flex flex-col gap-[0.5rem] text-sm">
      <select
        ref={ref}
        defaultValue=""
        required
        className={`rounded-[0.5rem] border-[0.05rem] px-[1.0rem] py-[1.3rem] outline-none ${borderColor} cursor-pointer appearance-none bg-[url('/icons/select-icon.svg')] bg-[calc(100%-1rem)_center] bg-no-repeat invalid:text-placeholder`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      {errorMessage && <div className="text-warning-800">{errorMessage}</div>}
    </div>
  );
};

const Option = ({
  value,
  children,
  ...props
}: ComponentPropsWithoutRef<'option'>) => {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
};

const ExportSelect = Object.assign(forwardRef(Select), { Option });

export default ExportSelect;
