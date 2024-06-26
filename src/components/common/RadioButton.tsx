import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react';

type RadioButtonProps = {
  label?: string;
} & Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'type' | 'className'>;

const BASE_RADIO_BUTTON_CLASSES =
  'px-[1.4rem] py-[0.6rem] bg-main-600/[0.18] text-main-900 font-body2-regular rounded-[2rem] cursor-pointer peer-checked:bg-main-900 peer-checked:text-white';

const RadioButton = (
  { name, value, label, ...props }: RadioButtonProps,
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
      <p className={BASE_RADIO_BUTTON_CLASSES}>{label ?? value}</p>
    </label>
  );
};

export default forwardRef(RadioButton);
