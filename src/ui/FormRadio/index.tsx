// import FORM_RULES from '@/constants/FormRule';
import {
  FormControl,
  FormLabel,
  // useTheme,
  RadioGroup,
  Radio,
  Stack,
  // HStack,
  Flex,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

interface radioValues {
  value: string;
  text: string;
}

interface FormRadioProps {
  label: string;
  name: string;
  radioValues: radioValues[];
  defaultValue: string;
}

const FormRadio = ({
  label,
  name,
  radioValues,
  defaultValue,
}: FormRadioProps) => {
  const { register } = useFormContext();

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup defaultValue={defaultValue}>
        <Stack
          width="100%"
          direction="column"
          spacing="1rem"
          border="0.1rem solid"
          borderColor="white.700"
          borderRadius="0.4rem"
          bgColor="white.900"
          p="1rem 2rem"
        >
          <Flex flexWrap="wrap" justify="space-around">
            {radioValues.map(radioValue => {
              const { value, text } = radioValue;
              return (
                <Radio
                  key={value}
                  value={value}
                  colorScheme="orange"
                  flex="0 1 auto"
                  w="9rem"
                  {...register(name)}
                >
                  {' '}
                  {text}
                </Radio>
              );
            })}
          </Flex>
        </Stack>
      </RadioGroup>
    </FormControl>
  );
};

export default FormRadio;
