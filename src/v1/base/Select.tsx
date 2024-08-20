import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react';

interface SelectProps
  extends Omit<
    ComponentPropsWithoutRef<'select'>,
    'className' | 'defaultValue' | 'required'
  > {
  error?: boolean;
}

const _Select = (
  { error, children, placeholder, ...props }: SelectProps,
  ref: Ref<HTMLSelectElement>
) => {
  const borderColor = error
    ? 'border-warning-800'
    : 'border-black-400 focus:border-main-900';

  return (
    <div className="text-sm">
      <select
        ref={ref}
        defaultValue=""
        required
        className={`rounded-[0.5rem] border-[0.05rem] px-[1.0rem] py-[1.1rem] outline-none ${borderColor} w-full cursor-pointer appearance-none bg-[url('/icons/select-icon.svg')] bg-[length:1.5rem_1.5rem] bg-[calc(100%-1rem)_center] bg-no-repeat invalid:text-placeholder`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
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

const Select = Object.assign(forwardRef(_Select), { Option });

export default Select;
