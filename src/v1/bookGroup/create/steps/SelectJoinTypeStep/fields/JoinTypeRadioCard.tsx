import { forwardRef, InputHTMLAttributes, Ref } from 'react';

const BASE_CLASSES =
  'flex h-[8rem] w-full cursor-pointer items-center justify-between rounded-[0.5rem] border-[0.1rem] bg-white px-[2.5rem] text-black-600 font-body1-regular';

const JoinTypeRadioCard = (
  {
    id,
    value,
    label,
    ...props
  }: Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> & {
    label?: string;
  },
  ref: Ref<HTMLInputElement>
) => {
  const inputId = id || 'radio-card';

  return (
    <div>
      <input
        type="radio"
        id={inputId}
        value={value}
        className="peer hidden"
        ref={ref}
        {...props}
      />
      <label
        className={`${BASE_CLASSES} after:h-[2.4rem] peer-checked:border-main-900 peer-checked:bg-main-900/[0.05] peer-checked:text-main-brighter peer-checked:after:content-check`}
        htmlFor={inputId}
      >
        <p>{label}</p>
      </label>
    </div>
  );
};

export default forwardRef(JoinTypeRadioCard);
