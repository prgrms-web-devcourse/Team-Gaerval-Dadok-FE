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
} from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '@/ui/FormInput';
import FormRadio from '@/ui/FormRadio';
import BottomSheet from '@/ui/common/BottomSheet';
import BookSearch from '@/ui/BookSearch';
import { useEffect, useState } from 'react';
import { APIBook } from '@/types/book';
import GroupAPI from '@/apis/group';
import { useRouter } from 'next/navigation';
import { APICreateGroup } from '@/types/group';
import {
  MAX_MEMBER_COUNT_VALUE,
  IS_PUBLICK_VALUE,
  HAS_JOIN_PASSWORD_VALUE,
} from '../../constants/groupRadioValues';
import Button from '@/ui/common/Button';

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
  const router = useRouter();
  const [memberCountInput, setMemberCountInput] = useState('');
  const memberCountInputAsNumber = Number(memberCountInput);

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

  const { isValid } = methods.formState;
  const { maxMemberCount, hasJoinPasswd, isPublic } = methods.watch();

  useEffect(() => {
    if (hasJoinPasswd === 'false') {
      methods.setValue('joinPasswd', '');
      methods.setValue('joinQuestion', '');
      methods.clearErrors('joinPasswd');
      methods.clearErrors('joinQuestion');
    }
    if (maxMemberCount === '직접입력') {
      setMemberCountInput('');
      onMaxMemberSetOpen();
    }
  }, [methods, hasJoinPasswd, maxMemberCount, onMaxMemberSetOpen]);

  const onSubmit = async (group: FormValues) => {
    let maxMemberCount = group.maxMemberCount;

    if (maxMemberCount === 'null') maxMemberCount = null;
    else if (maxMemberCount === '직접입력')
      maxMemberCount = memberCountInputAsNumber;
    else maxMemberCount = Number(maxMemberCount);

    const request = {
      ...group,
      maxMemberCount,
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

  const onMaxMemberInputComplete = () => {
    const { isValid } = validateMaxMemberCount(memberCountInputAsNumber);
    if (isValid) {
      onMaxMemberSetClose();
    }
  };

  const validateMaxMemberCount = (value: number) => {
    if (value > 1000)
      return { isValid: false, message: '1000명 이하의 인원을 입력해 주세요' };

    if (value < 1)
      return { isValid: false, message: '1명 이상의 인원을 입력해 주세요' };

    return { isValid: true, message: null };
  };

  const getMaxMemberCountViewer = () => {
    if (maxMemberCount === 'null') {
      return '제한없음';
    }

    if (maxMemberCount === '직접입력') {
      const { isValid } = validateMaxMemberCount(memberCountInputAsNumber);
      return isValid ? `${memberCountInput}명` : '';
    }

    return `${maxMemberCount}명`;
  };

  const validationMessage = memberCountInput
    ? validateMaxMemberCount(memberCountInputAsNumber).message
    : '';

  return (
    <>
      <FormProvider {...methods}>
        <Box as="form" w="100%" onSubmit={methods.handleSubmit(onSubmit)}>
          <BookSelectBox
            selectedBook={selectedBook}
            onClick={onBookSearchOpen}
            isShowError={!!methods.getFieldState('bookId').error}
          />
          <Flex direction="column" gap="2rem" align="center">
            <Box display="none">
              <FormInput label="" name="bookId" />
            </Box>
            <FormInput label="제목" name="title" />
            <FormInput label="설명" name="introduce" />
            <FormRadio
              label={`참여 인원 : ${getMaxMemberCountViewer()}`}
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
          <Button
            type="submit"
            scheme={isValid ? 'orange-fill' : 'grey-fill'}
            my="4rem"
            fullWidth
          >
            모임 생성하기
          </Button>
        </Box>
      </FormProvider>
      <BookSearchBottomSheet
        isOpen={isBookSearchOpen}
        onClose={onBookSearchClose}
        onBookClick={book => {
          setSeletedBook(book);
          methods.setValue('bookId', book.bookId);
          onBookSearchClose();
        }}
      />
      <MaxMemberCountBottomSheet
        isOpen={isMaxMemberSetOpen}
        onClose={onMaxMemberSetClose}
        onCancel={() => {
          methods.setValue('maxMemberCount', 'null');
        }}
        onComplete={onMaxMemberInputComplete}
        inputValue={memberCountInput}
        onInputChange={e => setMemberCountInput(e.target.value)}
        validationMessage={validationMessage}
      />
    </>
  );
};

const BookSelectBox = ({
  selectedBook,
  onClick,
  isShowError,
}: {
  selectedBook?: APIBook;
  isShowError?: boolean;
  onClick: () => void;
}) => {
  const theme = useTheme();
  return (
    <Box
      onClick={onClick}
      fontSize="md"
      maxH="18rem"
      w="fit-content"
      mx="auto"
      border={isShowError ? `2px solid ${theme.colors.red['500']}` : 'none'}
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
  );
};

const BookSearchBottomSheet = ({
  isOpen,
  onClose,
  onBookClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  onBookClick: (book: APIBook) => void;
}) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <VStack px="2rem" py="2rem" h="95vh" gap="1rem" overflow="scroll">
        <BookSearch onBookClick={onBookClick} />
      </VStack>
    </BottomSheet>
  );
};

const MaxMemberCountBottomSheet = ({
  inputValue,
  onInputChange,
  isOpen,
  onClose,
  onCancel,
  onComplete,
  validationMessage,
}: {
  inputValue: string;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  onComplete: () => void;
  validationMessage: string | null;
}) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} onCancel={onCancel}>
      <VStack px="2rem" py="2rem" h="50vh" gap="1rem" overflow="scroll">
        <Text
          fontSize="lg"
          alignSelf="flex-end"
          bgColor="white.900"
          cursor="pointer"
          onClick={onComplete}
        >
          확인
        </Text>
        <Text fontSize="lg">참여 인원</Text>
        <InputGroup>
          <Input
            h="4rem"
            value={inputValue}
            focusBorderColor="main"
            type="number"
            placeholder="모임 인원을 입력해주세요"
            onChange={onInputChange}
          />
        </InputGroup>
        <Text fontSize="sm" color="red.900">
          {validationMessage}
        </Text>
      </VStack>
    </BottomSheet>
  );
};

export default AddGroupForm;
