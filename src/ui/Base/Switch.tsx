import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react';

// interface SwitchProps {
//   // name?: string;
//   // checked: boolean;
//   // onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
//   // onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
// }

const Switch = (
  { ...props }: ComponentPropsWithoutRef<'input'>,
  ref: Ref<HTMLInputElement>
) => {
  return (
    <label className="relative flex items-center" htmlFor={props.name}>
      <input
        id={props.name}
        name={props.name}
        className="peer hidden"
        type="checkbox"
        ref={ref}
        {...props}
      />
      <div
        role="switch"
        aria-checked
        className={`absolute h-[2.4rem] w-[4.2rem] items-center rounded-full bg-cancel peer-checked:bg-main-900`}
      />
      <span className="sr-only">{`Enable ${props.name}`}</span>
      <span
        className={`absolute left-0 inline-block h-[2rem] w-[2rem] translate-x-[2rem] transform rounded-full bg-white transition peer-checked:translate-x-[0.25rem]`}
      />
    </label>
  );
};

export default forwardRef(Switch);
