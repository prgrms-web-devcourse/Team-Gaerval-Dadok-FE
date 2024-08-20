import { Switch } from '@headlessui/react';
import { Fragment } from 'react';

const MySwitch = () => {
  return (
    <Switch name="terms-of-service" defaultChecked={true} as={Fragment}>
      {({ checked }) => (
        <button
          className={`${
            checked ? 'bg-main-900' : 'bg-cancel'
          } relative inline-flex h-[2.4rem] w-[4.2rem] items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              checked ? 'translate-x-[0.25rem]' : 'translate-x-[2rem]'
            } inline-block h-[2rem] w-[2rem] transform rounded-full bg-white transition`}
          />
        </button>
      )}
    </Switch>
  );
};

export default MySwitch;
