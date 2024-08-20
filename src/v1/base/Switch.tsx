import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react';

const Switch = (
  {
    name,
    ...props
  }: Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'type' | 'className'>,
  ref: Ref<HTMLInputElement>
) => {
  return (
    <label
      className="relative inline-flex h-[2.8rem] w-[4.9rem] cursor-pointer items-center"
      htmlFor={name}
    >
      <input
        id={name}
        name={name}
        className="peer hidden"
        type="checkbox"
        ref={ref}
        {...props}
      />
      <div className="absolute bottom-0 left-0 right-0 top-0 rounded-full bg-cancel peer-checked:bg-main-900" />
      <span className="absolute left-0 h-[2.4rem] w-[2.4rem] translate-x-[0.2rem] transform rounded-full bg-white transition peer-checked:translate-x-[2.3rem]" />
      <span className="sr-only">{`Enable ${name}`}</span>
    </label>
  );
};

export default forwardRef(Switch);
