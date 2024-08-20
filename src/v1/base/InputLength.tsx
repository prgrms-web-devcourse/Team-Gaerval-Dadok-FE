type InputLengthProps = {
  currentLength?: number;
  isError?: boolean;
  maxLength?: number;
};

const InputLength = ({
  currentLength,
  isError = false,
  maxLength,
}: InputLengthProps) => {
  const textColor = isError ? 'text-warning-800 ' : 'text-main-900';

  return (
    <p className="text-xs">
      <span className={textColor}>{currentLength ? currentLength : 0}</span>/
      {maxLength}
    </p>
  );
};

export default InputLength;
