import { useEffect, useState } from 'react';

const useIsScrollAtTop = () => {
  const [isScrollAtTop, setIsScrollAtTop] = useState(true);

  const listener = () => {
    setIsScrollAtTop(window.scrollY === 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  return { isScrollAtTop };
};

export default useIsScrollAtTop;
