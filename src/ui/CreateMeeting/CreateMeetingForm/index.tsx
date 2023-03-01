'use client';

import UserInput from '@/ui/UserForm/UserInput';
import { Box, Flex, useTheme } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';

const CreateMeetingForm = () => {
  const methods = useForm({
    mode: 'all',
    defaultValues: {
      meetingTitle: '',
      meetingExplanation: '',
      meetingPersonnelNumber: '',
      meetingStartDate: '',
      meetingEndDate: '',
    },
  });

  const theme = useTheme();

  const handleInputSubmit: Parameters<typeof methods.handleSubmit>[0] = async ({
    meetingTitle,
    meetingExplanation,
    meetingPersonnelNumber,
    meetingStartDate,
    meetingEndDate,
  }) => {
    const delay = () => {
      return new Promise<void>(resolve =>
        setTimeout(() => {
          console.log('submit');
          resolve();
        }, 1000)
      );
    };
    await delay();

    console.log(meetingTitle);
    console.log(meetingExplanation);
    console.log(meetingPersonnelNumber);
    console.log(meetingStartDate);
    console.log(meetingEndDate);
  };

  return (
    <FormProvider {...methods}>
      <Box
        as="form"
        w="100%"
        px="2rem"
        onSubmit={methods.handleSubmit(handleInputSubmit)}
      >
        <Flex direction="column" gap="2rem" align="center">
          <UserInput label="모임제목" name="meetingTitle" />
          <UserInput label="모임설명" name="meetingExplanation" />
          <UserInput label="모임인원" name="meetingPersonnelNumber" />
          <UserInput label="모임 시작일" name="meetingStartDate" type="date" />
          <UserInput label="모임 종료일" name="meetingEndDate" type="date" />
        </Flex>
        <Box
          as="button"
          w="100%"
          mt="4rem"
          px="2rem"
          py="1rem"
          disabled={methods.formState.isSubmitting}
          color={theme.colors.main}
          border="1px solid"
          borderRadius="5rem"
          fontSize="md"
          _disabled={{
            color: `${theme.colors.black['500']}`,
            border: '1px solid',
          }}
        >
          모임 생성하기
        </Box>
      </Box>
    </FormProvider>
  );
};

export default CreateMeetingForm;
