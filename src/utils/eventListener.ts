/**
 * 참고
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#safely_detecting_option_support
 * */

type FixedEventListenerOptions =
  | (AddEventListenerOptions & EventListenerOptions)
  | boolean;

let passiveSupported = false;

const emptyListener = () => void {};

try {
  const options: FixedEventListenerOptions = {
    get passive() {
      // This function will be called when the browser
      // attempts to access the passive property.
      passiveSupported = true;
      return false;
    },
  };

  window.addEventListener('test', emptyListener, options);
  window.removeEventListener('test', emptyListener, options);
} catch {
  passiveSupported = false;
}

export const nonPassive: FixedEventListenerOptions = passiveSupported
  ? { passive: false }
  : false;
