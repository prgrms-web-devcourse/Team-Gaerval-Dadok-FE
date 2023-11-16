type InputLengthProps = {
  currentLength: number;
  isError: boolean;
  maxLength: number;
};

const InputLength = ({
  currentLength,
  isError,
  maxLength,
}: InputLengthProps) => {
  const textColor = isError ? 'text-warning-800 ' : 'text-main-900';

  return (
    <div>
      <span className={textColor}>{currentLength ? currentLength : 0}</span>/
      {maxLength}
    </div>
  );
};

export default InputLength;
