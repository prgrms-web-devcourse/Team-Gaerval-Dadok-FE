import { forwardRef, Ref, useState } from 'react';

import useRemoveVerticalScroll from '@/hooks/useRemoveVerticalScroll';

const withScrollLockOnFocus = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Component = (props: P, ref: Ref<HTMLElement>) => {
    const [focus, setFocus] = useState(false);
    useRemoveVerticalScroll({ enabled: focus });

    return (
      <WrappedComponent
        {...props}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        ref={ref}
      />
    );
  };

  return forwardRef(Component);
};

export default withScrollLockOnFocus;
