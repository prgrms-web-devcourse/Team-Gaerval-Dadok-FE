import FORM_RULES from '@/constants/FormRule';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Text,
  useTheme,
} from '@chakra-ui/react';
import type { OptionHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface FormSelectProps {
  label: string;
  name: string;
  options: Pick<OptionHTMLAttributes<HTMLOptionElement>, 'value' | 'label'>[];
}

const FormSelect = ({ label, name, options }: FormSelectProps) => {
  const theme = useTheme();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const rules = FORM_RULES[name];

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>
        {label}
        {!!rules.required && (
          <Text as="span" color="red">
            *
          </Text>
        )}
      </FormLabel>
      <Select
        focusBorderColor={theme.colors.main}
        placeholder={`${label}을 선택해주세요.`}
        size="md"
        h="4.2rem"
        {...register(name, rules)}
      >
        {options.map(({ label, value }) => (
          <option key={String(value)} value={value}>
            {label}
          </option>
        ))}
      </Select>
      {error?.message && (
        <FormErrorMessage>{String(error.message)}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FormSelect;
