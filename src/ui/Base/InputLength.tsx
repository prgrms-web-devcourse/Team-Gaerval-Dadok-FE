import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useWatch,
} from 'react-hook-form';

type InputLengthProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<UseControllerProps<TFieldValues, TFieldName>, 'control' | 'name'> & {
  minLength: number;
  maxLength: number;
};

const InputLength = <T extends FieldValues>({
  control,
  name,
  minLength,
  maxLength,
}: InputLengthProps<T>) => {
  const targetInput = useWatch({
    control,
    name,
  });

  const currentLength = targetInput ? targetInput.length : 0;
  const isError = currentLength < minLength || currentLength > maxLength;
  const textColor = isError ? 'text-warning-800 ' : 'text-main-900';

  return (
    <div>
      <span className={textColor}>{currentLength}</span>/{maxLength}
    </div>
  );
};

export default InputLength;
