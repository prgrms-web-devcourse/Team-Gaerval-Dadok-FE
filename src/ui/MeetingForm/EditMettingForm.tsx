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
import { APICreateMeetingReqeust } from '@/types/meeting';

interface EditMeetingFormInterface {
  onSubmit: (meeting: APICreateMeetingReqeust) => Promise<void>;
}

const EditMeetingForm = ({ onSubmit: onClick }: EditMeetingFormInterface) => {
  const [selectedBook, setSeletedBook] = useState<APIBook>();
  const methods = useForm({
    mode: 'all',
    defaultValues: {
      bookId: 0,
      title: '',
      introduce: '',
      maxMemberCount: 100,
      startDate: '',
      endDate: '',
      hasJoinPasswd: false,
      isPublic: true,
    },
  });
  const theme = useTheme();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <FormProvider {...methods}>
        <Box as="form" w="100%" onSubmit={methods.handleSubmit(onClick)}>
          <Box
            onClick={onOpen}
            fontSize="md"
            maxH="18rem"
            w="fit-content"
            mx="auto"
            border={
              methods.getFieldState('bookId').error
                ? `2px solid ${theme.colors.red['500']}`
                : 'none'
            }
          >
            {selectedBook && selectedBook.imageUrl ? (
              <Image src={selectedBook.imageUrl} alt="book-cover" />
            ) : (
              <Center
                borderRadius={10}
                bgColor="white"
                w="12rem"
                h="17.4rem"
                textAlign="center"
              >
                책을
                <br />
                선택해주세요.
              </Center>
            )}
          </Box>
          <Flex direction="column" gap="2rem" align="center">
            <Box display="none">
              <FormInput label="" name="bookId" />
            </Box>
            <FormInput label="제목" name="title" />
            <FormInput label="설명" name="introduce" />
            <FormInput label="시작일" name="startDate" type="date" />
            <FormInput label="종료일" name="endDate" type="date" />
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
            onBookClick={async book => {
              setSeletedBook(book);
              methods.setValue('bookId', book.bookId);
              await methods.trigger();
              onClose();
            }}
          />
        </VStack>
      </BottomSheet>
    </>
  );
};

export default EditMeetingForm;
