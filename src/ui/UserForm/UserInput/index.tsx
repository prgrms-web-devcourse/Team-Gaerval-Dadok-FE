import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useTheme,
} from '@chakra-ui/react';
import CloseIcon from '@public/icons/close.svg';
import { useState } from 'react';
import type { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface UserInputProps {
  isRequired?: boolean;
  label: string;
  id: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  resetField?: () => void;
}

const UserInput = ({
  label,
  id,
  register,
  error,
  resetField,
}: UserInputProps) => {
  const theme = useTheme();
  const { colors } = theme;

  const onResetButtonClick = () => {
    resetField && resetField();
  };

  const [isFocus, setIsFocus] = useState(false);

  const onInputFocus = () => {
    setIsFocus(true);
  };

  const onInputBlur = () => {
    setIsFocus(false);
  };

  return (
    <FormControl
      isInvalid={!!error}
      onFocus={onInputFocus}
      onBlur={onInputBlur}
      isRequired={register ? register.required : false}
    >
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <InputGroup size="lg">
        <Input focusBorderColor={colors.main} {...register} />
        {resetField && isFocus && (
          <InputRightElement>
            <button type="button" onClick={onResetButtonClick}>
              <CloseIcon width="1.5rem" fill={colors.black['800']} />
            </button>
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default UserInput;
