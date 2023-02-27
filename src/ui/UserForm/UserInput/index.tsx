import FORM_RULES from '@/constants/FormRule';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useTheme,
} from '@chakra-ui/react';
import CloseIcon from '@public/icons/close.svg';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { MouseEvent, TouchEvent } from 'react';
import type { HTMLInputTypeAttribute } from 'react';

interface UserInputProps {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
}

const UserInput = ({ label, name, type = 'text' }: UserInputProps) => {
  const theme = useTheme();
  const { colors } = theme;

  const {
    register,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  const rules = FORM_RULES[name];

  const onClearButtonClick = async (
    event: MouseEvent | TouchEvent<HTMLElement>
  ) => {
    setValue(name, '');
    await trigger(name);
    event.preventDefault();
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
    >
      <FormLabel>
        {label}
        {!!rules.required && (
          <Text as="span" color="red">
            *
          </Text>
        )}
      </FormLabel>
      <InputGroup>
        <Input
          focusBorderColor={colors.main}
          py="2rem"
          type={type}
          {...register(name, rules)}
        />
        {isFocus && getValues(name).length && (
          <InputRightElement h="100%">
            <button
              type="button"
              onMouseDown={onClearButtonClick}
              onTouchEnd={onClearButtonClick}
              tabIndex={-1}
            >
              <CloseIcon width="1.5rem" fill={colors.black['800']} />
            </button>
          </InputRightElement>
        )}
      </InputGroup>
      {error?.message && (
        <FormErrorMessage>{String(error.message)}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default UserInput;
