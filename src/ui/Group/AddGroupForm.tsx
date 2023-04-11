import {
  Box,
  Center,
  Flex,
  Image,
  useDisclosure,
  useTheme,
  VStack,
  Input,
  Text,
  InputGroup,
  Button,
} from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '@/ui/FormInput';
import FormRadio from '@/ui/FormRadio';
import BottomSheet from '@/ui/common/BottomSheet';
import BookSearch from '@/ui/BookSearch';
import IconButton from '@/ui/common/IconButton';
import { useEffect, useState } from 'react';
import { APIBook } from '@/types/book';
import GroupAPI from '@/apis/group';
import { useRouter } from 'next/router';
import { APICreateGroup } from '@/types/group';
import {
  MAX_MEMBER_COUNT_VALUE,
  IS_PUBLICK_VALUE,
  HAS_JOIN_PASSWORD_VALUE,
} from '../../constants/groupRadioValues';

interface FormValues
  extends Omit<
    APICreateGroup,
    'maxMemberCount' | 'hasJoinPasswd' | 'isPublic'
  > {
  maxMemberCount: number | string | null;
  hasJoinPasswd: 'true' | 'false' | boolean;
  isPublic: 'true' | 'false' | boolean;
}

const AddGroupForm = () => {
  const theme = useTheme();
  const router = useRouter();
  const [userSelectMemberCount, setUserSelectMemberCount] = useState('');

  const [selectedBook, setSeletedBook] = useState<APIBook>();
  const {
    isOpen: isBookSearchOpen,
    onClose: onBookSearchClose,
    onOpen: onBookSearchOpen,
  } = useDisclosure();
  const {
    isOpen: isMaxMemberSetOpen,
    onClose: onMaxMemberSetClose,
    onOpen: onMaxMemberSetOpen,
  } = useDisclosure();

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
      maxMemberCount: 'null',
      startDate,
      endDate: '',
      hasJoinPasswd: 'false',
      joinQuestion: '',
      joinPasswd: '',
      isPublic: 'true',
    },
  });

  const { maxMemberCount, hasJoinPasswd, isPublic } = methods.watch();

  useEffect(() => {
    if (hasJoinPasswd === 'false') {
      methods.setValue('joinPasswd', '');
      methods.setValue('joinQuestion', '');
      methods.clearErrors('joinPasswd');
      methods.clearErrors('joinQuestion');
    }
    if (methods.watch('maxMemberCount') === '직접입력') {
      onMaxMemberSetOpen();
    }
    console.log(maxMemberCount);
  }, [methods, hasJoinPasswd, maxMemberCount, onMaxMemberSetOpen]);

  const onSubmit = async (group: FormValues) => {
    const request = {
      ...group,
      maxMemberCount:
        group.maxMemberCount === 'null' ? null : Number(group.maxMemberCount),
      isPublic: group.isPublic === 'true' ? true : false,
      hasJoinPasswd: group.hasJoinPasswd === 'true' ? true : false,
    };

    try {
      await GroupAPI.createGroup({ group: request });
      router.replace('/group');
    } catch (error) {
      console.error(error);
    }
  };

  const onClick = () => {
    if (
      Number(userSelectMemberCount) > 0 &&
      Number(userSelectMemberCount) <= 1000
    ) {
      methods.setValue('maxMemberCount', userSelectMemberCount);
      onMaxMemberSetClose();
    }
  };

  const getValidationMessage = () => {
    if (Number(userSelectMemberCount) > 1000) {
      return '1000명 이하의 인원을 입력해 주세요';
    } else if (
      userSelectMemberCount === '' ||
      Number(userSelectMemberCount) < 1
    ) {
      return '1명 이상의 인원을 입력해 주세요';
    } else {
      return '';
    }
  };

  const maxMemberCountViewer =
    maxMemberCount === 'null'
      ? '제한없음'
      : maxMemberCount === '직접입력'
      ? getValidationMessage() === ''
        ? `${userSelectMemberCount}명`
        : ''
      : `${maxMemberCount}명`;

  const validationMessage = getValidationMessage();

  return (
    <>
      <FormProvider {...methods}>
        <Box as="form" w="100%" onSubmit={methods.handleSubmit(onSubmit)}>
          <Box
            onClick={onBookSearchOpen}
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
              label={`참여 인원 : ${maxMemberCountViewer}`}
              name="maxMemberCount"
              radioValues={MAX_MEMBER_COUNT_VALUE}
              value={`${maxMemberCount}`}
            />
            <FormRadio
              label="댓글 공개 여부"
              name="isPublic"
              radioValues={IS_PUBLICK_VALUE}
              value={`${isPublic}`}
            />
            <FormRadio
              label="모임 가입 문제"
              name="hasJoinPasswd"
              radioValues={HAS_JOIN_PASSWORD_VALUE}
              value={`${hasJoinPasswd}`}
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
      <BottomSheet isOpen={isBookSearchOpen} onClose={onBookSearchClose}>
        <VStack px="2rem" py="2rem" h="95vh" gap="1rem" overflow="scroll">
          <IconButton
            name="close"
            onClick={onBookSearchClose}
            alignSelf="flex-end"
            tabIndex={-1}
          />
          <BookSearch
            onBookClick={book => {
              setSeletedBook(book);
              methods.setValue('bookId', book.bookId);
              onBookSearchClose();
            }}
          />
        </VStack>
      </BottomSheet>
      <BottomSheet
        isOpen={isMaxMemberSetOpen}
        onClose={onMaxMemberSetClose}
        onCancel={() => methods.setValue('maxMemberCount', 'null')}
      >
        <VStack px="2rem" py="2rem" h="50vh" gap="1rem" overflow="scroll">
          <Button
            fontSize="lg"
            alignSelf="flex-end"
            bgColor="white.900"
            onClick={onClick}
          >
            확인
          </Button>
          <Text fontSize="lg">참여 인원</Text>
          <InputGroup>
            <Input
              h="4rem"
              value={userSelectMemberCount}
              focusBorderColor="main"
              type="number"
              placeholder="모임 인원을 입력해주세요"
              onChange={e => setUserSelectMemberCount(e.target.value)}
            />
          </InputGroup>
          <Text fontSize="sm" color="red.900">
            {validationMessage}
          </Text>
        </VStack>
      </BottomSheet>
    </>
  );
};

export default AddGroupForm;
