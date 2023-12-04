import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react';

const BASE_RADIO_BUTTON_CLASSES =
  'px-[1.2rem] py-[0.5rem] bg-main-600/[0.18] text-main-900 text-sm font-normal rounded-[2rem] cursor-pointer w-full h-full peer-checked:bg-main-900 peer-checked:text-white';

const RadioButton = (
  {
    name,
    value,
    ...props
  }: Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'type' | 'className'>,
  ref: Ref<HTMLInputElement>
) => {
  return (
    <label htmlFor={`id-${value}`}>
      <input
        id={`id-${value}`}
        name={name}
        className="peer hidden"
        type="radio"
        value={value}
        ref={ref}
        {...props}
      />
      <span className={BASE_RADIO_BUTTON_CLASSES}>{value}</span>
    </label>
  );
};

export default forwardRef(RadioButton);
