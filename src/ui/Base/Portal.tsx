import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  id: string;
};

const Portal = ({ id, children }: PropsWithChildren<PortalProps>) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let rootElement = document.getElementById(id);

    if (!rootElement) {
      rootElement = document.createElement('div');
      rootElement.setAttribute('id', id);
      document.body.appendChild(rootElement);
    }

    setElement(rootElement);
  }, [id]);

  if (!element) {
    return null;
  }

  return createPortal(children, element);
};

export default Portal;
