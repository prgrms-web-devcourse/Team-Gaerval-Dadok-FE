import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react';

type InputStyle = 'default' | 'line';
type FontSize = 'small' | 'large';
type LeftIconType = 'search';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  inputStyle?: InputStyle;
  leftIconType?: LeftIconType;
  fontSize?: FontSize;
  error?: boolean;
  showSearchIcon?: boolean;
}

const FONT_SIZE_CLASSES = {
  small: 'font-body1-regular after:font-body1-regular',
  large: 'font-subheading-bold after:font-subheading-bold',
};

const getInputStyleClasses = (inputStyle: InputStyle) => {
  switch (inputStyle) {
    case 'line':
      return 'border-b-[0.1rem] border-black-400';
    case 'default':
    default:
      return 'rounded-[0.5rem] border-[0.05rem] px-[1rem]';
  }
};

const getLeftIconClass = (iconType?: LeftIconType) => {
  switch (iconType) {
    case 'search':
      return 'pr-[1rem] before:h-[2.4rem] before:w-[2rem] before:relative before:top-[0.2rem] before:mx-[1rem] before:content-search';
    default:
      return '';
  }
};

const Input = (
  {
    inputStyle = 'default',
    fontSize = 'small',
    error = false,
    leftIconType,
    className = '',
    ...props
  }: InputProps,
  ref: Ref<HTMLInputElement>
) => {
  const inputStyleClass = getInputStyleClasses(inputStyle);
  const leftIconClass = getLeftIconClass(leftIconType);
  const fontSizeClass = FONT_SIZE_CLASSES[fontSize];
  const borderColorClass = error
    ? 'border-warning-800 focus-within:border-warning-800'
    : 'border-black-400 focus-within:border-main-900';

  return (
    <div
      className={`flex w-full items-center bg-transparent ${inputStyleClass} ${borderColorClass} ${fontSizeClass} ${leftIconClass} ${className}`}
    >
      <input
        className={`h-[4.4rem] w-full bg-transparent outline-none autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] ${fontSizeClass}`}
        {...props}
        ref={ref}
      />
    </div>
  );
};

export default forwardRef(Input);
