type InputLengthProps = {
  currentValue: string;
  isError: boolean;
  maxLength: number;
};

const InputLength = ({
  currentValue = '',
  isError,
  maxLength,
}: InputLengthProps) => {
  const currentLength = currentValue ? currentValue.length : 0;
  const textColor = isError ? 'text-warning-800 ' : 'text-main-900';

  return (
    <div>
      <span className={textColor}>{currentLength}</span>/{maxLength}
    </div>
  );
};

export default InputLength;
