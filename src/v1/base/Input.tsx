import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react';

type InputStyle = 'default' | 'line';
type FontSize = 'small' | 'large';
interface InputProps extends ComponentPropsWithoutRef<'input'> {
  inputStyle?: InputStyle;
  fontSize?: FontSize;
  error?: boolean;
}

const FONT_SIZE_CLASSES = {
  small: 'text-sm',
  large: 'text-lg font-bold',
};

const getInputStyleClasses = (inputStyle: InputStyle) => {
  switch (inputStyle) {
    case 'line':
      return 'border-b-[0.1rem] border-black-400 bg-transparent';
    case 'default':
    default:
      return 'rounded-[0.5rem] border-[0.05rem]';
  }
};

const Input = (
  {
    inputStyle = 'default',
    fontSize = 'small',
    error = false,
    children,
    ...props
  }: InputProps,
  ref: Ref<HTMLInputElement>
) => {
  const inputStyleClass = getInputStyleClasses(inputStyle);
  const fontSizeClass = FONT_SIZE_CLASSES[fontSize];
  const borderColorClass = error
    ? 'border-warning-800 focus:border-warning-800'
    : 'border-black-400 focus:border-main-900';

  return (
    <div className={fontSizeClass}>
      <input
        className={`w-full px-[1rem] py-[1.3rem] outline-none ${inputStyleClass} ${borderColorClass}`}
        {...props}
        ref={ref}
      />
      {children}
    </div>
  );
};

export default forwardRef(Input);
