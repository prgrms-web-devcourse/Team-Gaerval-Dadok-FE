'use client';

import UserInput from '@/ui/UserForm/UserInput';
import { Box, Flex, useTheme } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import {
  meetingTitleRule,
  meetingExplanationRule,
  meetingPersonnelNumberRule,
  meetingStartDateRule,
  meetingEndDateRule,
} from '@/constants/FormRule';

const CreateMeetingForm = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({
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

  const handleInputSubmit: Parameters<typeof handleSubmit>[0] = async ({
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
    <>
      <Box
        as="form"
        w="100%"
        px="2rem"
        onSubmit={handleSubmit(handleInputSubmit)}
      >
        <Flex direction="column" gap="2rem" align="center">
          <UserInput
            label="모임제목"
            id="meetingTitle"
            register={register('meetingTitle', meetingTitleRule)}
            error={errors.meetingTitle}
            resetField={() => resetField('meetingTitle')}
          />
          <UserInput
            label="모임설명"
            id="meetingExplanation"
            register={register('meetingExplanation', meetingExplanationRule)}
            error={errors.meetingExplanation}
            resetField={() => resetField('meetingExplanation')}
          />
          <UserInput
            label="모임인원"
            id="meetingPersonnelNumber"
            register={register(
              'meetingPersonnelNumber',
              meetingPersonnelNumberRule
            )}
            error={errors.meetingPersonnelNumber}
            resetField={() => resetField('meetingPersonnelNumber')}
          />
          <UserInput
            label="모임 시작일"
            id="meetingStartDate"
            register={register('meetingStartDate', meetingStartDateRule)}
            error={errors.meetingStartDate}
            type="date"
          />
          <UserInput
            label="모임 종료일"
            id="meetingEndDate"
            register={register('meetingEndDate', meetingEndDateRule)}
            error={errors.meetingEndDate}
            type="date"
          />
        </Flex>
        <Box
          as="button"
          w="100%"
          mt="4rem"
          px="2rem"
          py="1rem"
          disabled={isSubmitting}
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
    </>
  );
};

export default CreateMeetingForm;
