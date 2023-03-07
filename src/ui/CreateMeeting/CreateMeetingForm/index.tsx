import {
  Box,
  Center,
  Flex,
  Image,
  useDisclosure,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';

import FormInput from '@/ui/FormInput';
import BottomSheet from '@/ui/common/BottomSheet';
import BookSearch from '@/ui/BookSearch';
import IconButton from '@/ui/common/IconButton';
import { useState } from 'react';
import { APIBook } from '@/types/book';

const CreateMeetingForm = () => {
  const [selectedBook, setSeletedBook] = useState<APIBook>();
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

    console.log(selectedBook);
    console.log(meetingTitle);
    console.log(meetingExplanation);
    console.log(meetingPersonnelNumber);
    console.log(meetingStartDate);
    console.log(meetingEndDate);
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <FormProvider {...methods}>
        <Box
          as="form"
          w="100%"
          px="2rem"
          onSubmit={methods.handleSubmit(handleInputSubmit)}
        >
          <Box
            onClick={onOpen}
            fontSize="md"
            h="20rem"
            w="fit-content"
            mx="auto"
          >
            {selectedBook && selectedBook.imageUrl ? (
              <Image src={selectedBook.imageUrl} alt="book-cover" />
            ) : (
              <Center bgColor="white" w="12rem" h="17.4rem" textAlign="center">
                책을
                <br />
                선택해주세요.
              </Center>
            )}
          </Box>

          <Flex direction="column" gap="2rem" align="center">
            <FormInput label="모임제목" name="meetingTitle" />
            <FormInput label="모임설명" name="meetingExplanation" />
            <FormInput label="모임인원" name="meetingPersonnelNumber" />
            <FormInput
              label="모임 시작일"
              name="meetingStartDate"
              type="date"
            />
            <FormInput label="모임 종료일" name="meetingEndDate" type="date" />
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
      <BottomSheet isOpen={isOpen} onClose={onClose}>
        <VStack px="2rem" py="2rem" h="95vh" gap="1rem" overflow="scroll">
          <IconButton
            name="close"
            onClick={onClose}
            alignSelf="flex-end"
            tabIndex={-1}
          />
          <BookSearch
            onBookClick={book => {
              setSeletedBook(book);
              onClose();
            }}
          />
        </VStack>
      </BottomSheet>
    </>
  );
};

export default CreateMeetingForm;
