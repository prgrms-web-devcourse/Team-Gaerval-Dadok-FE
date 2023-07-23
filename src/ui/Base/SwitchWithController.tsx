import { forwardRef, Fragment, Ref } from 'react';
import { Controller, UseControllerProps } from 'react-hook-form';
import { Switch as HeadlessSwitch } from '@headlessui/react';

// type SwitchProps<FormValues extends Record<string, any>>
//   extends UseControllerProps<FormValues> {
// control: Control<FormValues>;
// name: string;
// onChange?: (checked: boolean) => void;
// onBlur?: (e: FocusEvent<HTMLButtonElement>) => void;
// }

const SwitchWithController = (
  { control, ...props }: UseControllerProps,
  ref: Ref<HTMLButtonElement>
) => {
  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field }) => (
        <HeadlessSwitch
          as={Fragment}
          checked={field.value}
          onChange={checked => field.onChange(checked)}
        >
          {({ checked }) => {
            const containerColorClass = checked ? 'bg-main-900' : 'bg-cancel';
            const thumbTransformClass = checked
              ? 'translate-x-[0.25rem]'
              : 'translate-x-[2rem]';
            console.dir(ref);

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
      )}
    />
  );
};

export default forwardRef(SwitchWithController);
