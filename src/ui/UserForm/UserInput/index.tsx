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
  clearField?: () => void;
}

const UserInput = ({ label, register, error, clearField }: UserInputProps) => {
  const theme = useTheme();
  const { colors } = theme;

  const onClearButtonClick = () => {
    clearField && clearField();
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
      onBlurCapture={onInputBlur}
      isRequired={register ? register.required : false}
    >
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input focusBorderColor={colors.main} py="2rem" {...register} />
        {clearField && isFocus && (
          <InputRightElement h="100%">
            <button type="button" onClick={onClearButtonClick} tabIndex={-1}>
              <CloseIcon width="1.5rem" fill={colors.black['800']} />
            </button>
          </InputRightElement>
        )}
      </InputGroup>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default UserInput;
