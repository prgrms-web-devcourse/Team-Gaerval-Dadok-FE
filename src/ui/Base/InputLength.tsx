type InputLengthProps = {
  currentLength: number;
  isError: boolean;
  maxLength: number;
};

const InputLength = ({
  currentLength = 0,
  isError,
  maxLength,
}: InputLengthProps) => {
  const textColor = isError ? 'text-warning-800 ' : 'text-main-900';

  return (
    <div>
      <span className={textColor}>{currentLength}</span>/{maxLength}
    </div>
  );
};

export default InputLength;
