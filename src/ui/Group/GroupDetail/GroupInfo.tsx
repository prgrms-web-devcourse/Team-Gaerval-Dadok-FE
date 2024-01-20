import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import { MutableRefObject, useRef, useState } from 'react';
import Link from 'next/link';

import { APIGroupDetail } from '@/types/group';
import BottomSheet from '@/ui/common/BottomSheet';

import { useToast } from '@/hooks/toast';
import TopNavigation from '@/ui/common/TopNavigation';
import { Menu, MenuItem } from '@/ui/common/Menu';
import LoginBottomSheet from '@/ui/LoginBottomSheet';
import { checkAuthentication } from '@/utils/helpers';

interface GroupInfoProps {
  groupInfoData: APIGroupDetail;
  handleParticipateBtnClick: (
    password?: string,
    onSuccess?: () => void,
    onFailed?: () => void
  ) => void;
  handleDeleteGroupBtnClick: () => void;
}

const GroupInfo = ({
  groupInfoData,
  handleParticipateBtnClick,
  handleDeleteGroupBtnClick,
}: GroupInfoProps) => {
  const isAuthenticated = checkAuthentication();
  const [password, setPassword] = useState('');
  const cancelRef = useRef(null);
  const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onClose: onLoginModalClose,
  } = useDisclosure();
  const {
    isOpen: isPasswordModalOpen,
    onOpen: onPasswordModalOpen,
    onClose: onPasswordModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onClose: onDeleteModalClose,
    onOpen: onDeleteModalOpen,
  } = useDisclosure();

  const { showToast } = useToast();

  const {
    bookGroupId,
    title,
    introduce,
    startDate,
    endDate,
    hasJoinPasswd,
    joinQuestion,
    isPublic: _isPublic,
    maxMemberCount: _maxMemberCount,
    currentMemberCount,
    commentCount,
    owner: _owner,
    book,
    isOwner,
    isGroupMember,
  } = groupInfoData;

  const message = hasJoinPasswd ? '가입 비밀번호 입력 필요' : '바로 참여 가능';

  const onDeleteGroupClick = () => {
    if (currentMemberCount > 1) {
      showToast({
        message: '혼자가 아니면 다른 모임원들이 있어 모임 삭제가 불가능해요!',
      });
      onDeleteModalClose();
      return;
    }
    handleDeleteGroupBtnClick();
    onDeleteModalClose();
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onPartInButtonClick = () => {
    if (!isAuthenticated) {
      onLoginModalOpen();
      return;
    }
    hasJoinPasswd ? onPasswordModalOpen() : handleParticipateBtnClick();
  };

  return (
    <>
      <Flex align="center">
        <TopNavigation pageTitle="모임 상세 페이지" />
        {isOwner && (
          <Menu>
            <MenuItem
              text="수정"
              as={Link}
              href={`/group/${bookGroupId}/edit`}
            />
            <MenuItem text="삭제" color="red.300" onClick={onDeleteModalOpen}>
              <DeleteComfirmDialog
                cancelRef={cancelRef}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                onDelete={onDeleteGroupClick}
              />
            </MenuItem>
          </Menu>
        )}
      </Flex>

      <Flex direction="column" align="center">
        <Text fontSize="xl" fontWeight={700}>
          {title}
        </Text>
        <Text fontSize="md" m="1rem 0">
          {introduce}
        </Text>
      </Flex>
      <Flex mt="1.5rem" justify="space-between" h="14rem">
        <Box w="68%" bgColor="white" borderRadius="1rem" boxShadow="default">
          <Flex p="1rem" h="100%" direction="column" justify="space-between">
            <Box h="60%">
              <Box fontSize="1.2rem">
                {startDate} ~ {endDate}
              </Box>
              <Flex h="70%">
                <Text
                  fontSize="md"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  fontWeight={600}
                >
                  {book.title}
                </Text>
              </Flex>
            </Box>
            <Box>
              <Box fontSize="1.2rem" fontWeight={500} color="red.800">
                {isGroupMember ? '' : message}
              </Box>
              <Flex>
                <Flex align="center" w="4rem">
                  <Box>
                    <Image src="/icons/peopleIcon.svg" alt="peopleIcon" />
                  </Box>
                  <Box fontSize="1rem" w="3rem" ml="0.5rem">
                    {currentMemberCount}
                  </Box>
                </Flex>
                <Flex align="center" w="4rem" ml="0.5rem">
                  <Box>
                    <Image src="/icons/commentIcon.svg" alt="commentIcon" />
                  </Box>
                  <Text fontSize="1rem" w="3rem" ml="0.5rem">
                    {commentCount}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Flex w="30%" justify="center" align="center">
          <Link href={`/book/${book.id}`}>
            <Image
              src={book.imageUrl}
              alt="bookCover"
              w="10rem"
              objectFit="cover"
              borderRadius="1rem"
              boxShadow="default"
            />
          </Link>
        </Flex>
      </Flex>
      <Box mt="1.5rem">
        {!isOwner && (
          <>
            <Button
              w="100%"
              h="4.5rem"
              fontSize="md"
              fontWeight="600"
              borderRadius="1.2rem"
              color="white.900"
              border="0.1rem solid"
              backgroundColor="main"
              onClick={onPartInButtonClick}
              isDisabled={isGroupMember}
              _disabled={{
                border: 'none',
                color: 'main',
                background: 'white',
                pointerEvents: 'none',
              }}
            >
              {isGroupMember ? '참여 중' : '모임 참여하기'}
            </Button>
            <BottomSheet
              isOpen={isPasswordModalOpen}
              onClose={onPasswordModalClose}
            >
              <Flex p="3rem" h="90vh" gap="3rem" direction="column">
                <Button
                  alignSelf="flex-end"
                  bgColor="white.900"
                  onClick={() => {
                    handleParticipateBtnClick(password, () => {
                      onPasswordModalClose();
                      setPassword('');
                    });
                  }}
                >
                  확인
                </Button>
                <Flex direction="column" gap="1rem">
                  <Text fontSize="xl" color="main">
                    질문
                  </Text>
                  <Text fontSize="lg" fontWeight={700}>
                    {joinQuestion}
                  </Text>
                </Flex>
                <Flex direction="column" gap="1rem">
                  <Text fontSize="xl" color="main">
                    정답
                  </Text>
                  <Input
                    focusBorderColor="main"
                    value={password}
                    h="4rem"
                    placeholder="- 띄어쓰기 없이 정답을 입력해 주세요."
                    onChange={onChangePassword}
                  />
                </Flex>
              </Flex>
              <DeleteComfirmDialog
                cancelRef={cancelRef}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                onDelete={onDeleteGroupClick}
              />
            </BottomSheet>
          </>
        )}
      </Box>
      <LoginBottomSheet isOpen={isLoginModalOpen} onClose={onLoginModalClose} />
    </>
  );
};

export default GroupInfo;

const DeleteComfirmDialog = ({
  cancelRef,
  isOpen,
  onClose,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  cancelRef: MutableRefObject<null>;
}) => {
  const theme = useTheme();

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent alignSelf="center" p="1.5rem">
          <AlertDialogBody fontSize="md" py="1.5rem">
            모임을 정말 삭제할까요?
          </AlertDialogBody>
          <AlertDialogFooter as={Flex} justify="center" gap="1rem">
            <Button
              ref={cancelRef}
              onClick={onClose}
              flexGrow="1"
              {...theme.buttonSizes['md']}
              {...theme.scheme.button['grey']}
            >
              취소
            </Button>
            <Button
              ref={cancelRef}
              onClick={onDelete}
              flexGrow="1"
              {...theme.buttonSizes['md']}
              {...theme.scheme.button['orange-fill']}
            >
              삭제
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
