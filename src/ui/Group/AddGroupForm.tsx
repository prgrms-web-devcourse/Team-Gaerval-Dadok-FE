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
import FormRadio from '@/ui/FormRadio';
import BottomSheet from '@/ui/common/BottomSheet';
import BookSearch from '@/ui/BookSearch';
import IconButton from '@/ui/common/IconButton';
import { useEffect, useState } from 'react';
import { APIBook } from '@/types/book';
import MeetingAPI from '@/apis/meeting';
import { useRouter } from 'next/router';
import { APICreateMeetingReqeust } from '@/types/meeting';
import {
  MAX_MEMBER_COUNT_VALUE,
  MAX_MEMBER_DEFAULT_VALUE,
  IS_PUBLICK_DEFAULT_VALUE,
  IS_PUBLICK_VALUE,
  HAS_JOIN_PASSWORD_VALUE,
  HAS_JOIN_PASSWORD_DEFAULT_VALUE,
} from '../../constants/groupRadioValues';

interface FormValues
  extends Omit<
    APICreateMeetingReqeust,
    'maxMemberCount' | 'hasJoinPasswd' | 'isPublic'
  > {
  maxMemberCount: number | string | null;
  hasJoinPasswd: 'true' | 'false' | boolean;
  isPublic: 'true' | 'false' | boolean;
}

const AddGroupForm = () => {
  const theme = useTheme();
  const router = useRouter();
  const [selectedBook, setSeletedBook] = useState<APIBook>();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const date = new Date();
  const today = Date.now();
  const startDate = new Date(today - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

  const methods = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      bookId: 0,
      title: '',
      introduce: '',
      maxMemberCount: '100',
      startDate,
      endDate: '',
      hasJoinPasswd: 'false',
      joinQuestion: '',
      joinPasswd: '',
      isPublic: 'true',
    },
  });

  const hasJoinPasswd = methods.getValues('hasJoinPasswd');

  useEffect(() => {
    if (hasJoinPasswd === 'false') {
      methods.setValue('joinPasswd', '');
      methods.setValue('joinQuestion', '');
      methods.clearErrors('joinPasswd');
      methods.clearErrors('joinQuestion');
    }
  }, [methods, hasJoinPasswd]);

  const onSubmit = async (meeting: FormValues) => {
    const request = {
      ...meeting,
      maxMemberCount:
        meeting.maxMemberCount === 'null'
          ? null
          : Number(meeting.maxMemberCount),
      isPublic: meeting.isPublic === 'true' ? true : false,
      hasJoinPasswd: meeting.hasJoinPasswd === 'true' ? true : false,
    };

    try {
      await MeetingAPI.createMeeting({ meeting: request });
      router.replace('/group');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <Box as="form" w="100%" onSubmit={methods.handleSubmit(onSubmit)}>
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
            <FormRadio
              label="참여 인원"
              name="maxMemberCount"
              radioValues={MAX_MEMBER_COUNT_VALUE}
              defaultValue={MAX_MEMBER_DEFAULT_VALUE}
            />
            <FormRadio
              label="댓글 공개 여부"
              name="isPublic"
              radioValues={IS_PUBLICK_VALUE}
              defaultValue={IS_PUBLICK_DEFAULT_VALUE}
            />
            <FormRadio
              label="모임 가입 문제"
              name="hasJoinPasswd"
              radioValues={HAS_JOIN_PASSWORD_VALUE}
              defaultValue={HAS_JOIN_PASSWORD_DEFAULT_VALUE}
            />

            <FormInput
              label="문제"
              name="joinQuestion"
              disabled={
                methods.watch('hasJoinPasswd') === 'true' ? false : true
              }
            />
            <FormInput
              label="정답"
              name="joinPasswd"
              disabled={
                methods.watch('hasJoinPasswd') === 'true' ? false : true
              }
            />

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
            color="white.900"
            bgColor="main"
            border="1px solid"
            borderRadius="1.2rem"
            fontSize="lg"
            fontWeight="bold"
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
              methods.setValue('bookId', book.bookId);
              onClose();
            }}
          />
        </VStack>
      </BottomSheet>
    </>
  );
};

export default AddGroupForm;
