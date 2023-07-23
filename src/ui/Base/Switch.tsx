import { ChangeEvent, FocusEvent, forwardRef, Ref, useState } from 'react';

interface SwitchProps {
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

const Switch = ({ ...props }: SwitchProps, ref: Ref<HTMLInputElement>) => {
  const [checked, setChecked] = useState(false);

  const containerColorClass = checked ? 'bg-main-900' : 'bg-cancel';
  const thumbTransformClass = checked
    ? 'translate-x-[0.25rem]'
    : 'translate-x-[2rem]';

  return (
    <>
      <input value={checked + ''} className="hidden" ref={ref} {...props} />
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`${containerColorClass} relative inline-flex h-[2.4rem] w-[4.2rem] items-center rounded-full`}
        onClick={() => {
          setChecked(prev => !prev);
        }}
      >
        <span className="sr-only">{`Enable ${props.name}`}</span>
        <span
          className={`${thumbTransformClass} inline-block h-[2rem] w-[2rem] transform rounded-full bg-white transition`}
        />
      </button>
    </>
  );
};

export default forwardRef(Switch);
