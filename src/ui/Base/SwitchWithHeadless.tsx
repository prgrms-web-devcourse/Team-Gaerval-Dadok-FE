import { ChangeEvent, FocusEvent, forwardRef, Fragment, Ref } from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import { Control } from 'react-hook-form';

interface SwitchProps {
  name?: string;
  onChange?: (e: ChangeEvent<HTMLElement>) => void;
  onBlur?: (e: FocusEvent<HTMLElement>) => void;
  control?: Control;
}

const SwitchWithHeadless = (
  { onChange: _onChange, ...props }: SwitchProps,
  ref: Ref<HTMLButtonElement>
) => {
  const onCustomChange = (_checked: boolean) => {
    // onChange..
  };

  return (
    <HeadlessSwitch
      as={Fragment}
      ref={ref}
      onChange={onCustomChange}
      {...props}
    >
      {({ checked }) => {
        const containerColorClass = checked ? 'bg-main-900' : 'bg-cancel';
        const thumbTransformClass = checked
          ? 'translate-x-[0.25rem]'
          : 'translate-x-[2rem]';

        return (
          <button
            className={`${containerColorClass} relative inline-flex h-[2.4rem] w-[4.2rem] items-center rounded-full`}
          >
            <span className="sr-only">{`Enable ${name}`}</span>
            <span
              className={`${thumbTransformClass} inline-block h-[2rem] w-[2rem] transform rounded-full bg-white transition`}
            />
          </button>
        );
      }}
    </HeadlessSwitch>
  );
};

export default forwardRef(SwitchWithHeadless);
