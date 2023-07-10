import { Switch } from '@headlessui/react';
import { Fragment } from 'react';

const MySwitch = () => {
  return (
    <Switch name="terms-of-service" defaultChecked={true} as={Fragment}>
      {({ checked }) => (
        <button
          className={`${
            checked ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </button>
      )}
    </Switch>
  );
};

export default MySwitch;
