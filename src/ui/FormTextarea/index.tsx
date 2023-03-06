import FORM_RULES from '@/constants/FormRule';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Text,
  Textarea,
  useTheme,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface FormInputProps {
  label: string;
  name: string;
}

const FormTextarea = ({ label, name }: FormInputProps) => {
  const theme = useTheme();
  const { colors } = theme;

  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  const rules = FORM_RULES[name];

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
        <Textarea
          focusBorderColor={colors.main}
          {...register(name, rules)}
          py="1rem"
          h="30rem"
        />
        {isFocus && getValues(name).length}
      </InputGroup>
      {error?.message && (
        <FormErrorMessage>{String(error.message)}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FormTextarea;
