import { RefObject, useEffect, useRef } from 'react';

const useOutsideClickRef = <T extends HTMLElement = HTMLElement>(
  handler: () => void
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (ref && isValidEvent(event, ref)) {
        handler();
      }
    };

    const doc = getOwnerDocument(ref.current);

    doc.addEventListener('click', onClick);

    return () => {
      doc.removeEventListener('click', onClick);
    };
  }, [handler]);

  return ref;
};

const isValidEvent = (event: Event, ref: RefObject<HTMLElement>) => {
  const target = event.target as HTMLElement;

  if (target) {
    const doc = getOwnerDocument(target);
    if (!doc.contains(target)) return false;
  }

  return !ref.current?.contains(target);
};

const getOwnerDocument = (node?: Element | null): Document => {
  return node?.ownerDocument ?? document;
};

export default useOutsideClickRef;
