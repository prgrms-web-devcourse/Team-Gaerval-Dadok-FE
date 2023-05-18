import { useState } from 'react';

const useToggle = () => {
  const [value, setValue] = useState<boolean>(false);
  const toggle = () => setValue(value => !value);

  return { value, toggle, setValue };
};

export default useToggle;
