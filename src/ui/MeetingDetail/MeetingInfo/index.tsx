import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  useDisclosure,
  Input,
} from '@chakra-ui/react';
import { APIMeetingDetail } from '@/types/meetingDetail';
import { useRouter } from 'next/router';
import BottomSheet from '@/ui/common/BottomSheet';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import LoginBottomSheet from '@/ui/LoginBottomSheet';

interface MeetingInfoProps {
  meetingInfoData: APIMeetingDetail;
  handleParticipateBtnClick: (password?: string) => void;
  handleDeleteMeetingBtnClick: () => void;
}

const MeetingInfo = ({
  meetingInfoData,
  handleParticipateBtnClick,
  handleDeleteMeetingBtnClick,
}: MeetingInfoProps) => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const { isAuthed } = useAuth();
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
  } = meetingInfoData;

  const message = hasJoinPasswd ? '가입 비밀번호 입력 필요' : '바로 참여 가능';

  const handleMeetingDeleteButton = () => {
    /*TODO 모임원이 1명 초과인 상태에서는 삭제가 불가능하다는 알림 메세지 UI 구현 필요*/
    if (currentMemberCount > 1) {
      alert('혼자가 아니면 다른 모임원들이 있어 모임 삭제가 불가능해요!');
      return;
    }
    /*TODO 모임원이 모임장 1명인 상태에서 삭제할 때 한 번 더 확인하는 모달or바텀시트 필요*/
    handleDeleteMeetingBtnClick();
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onPartInButtonClick = () => {
    if (!isAuthed) {
      onLoginModalOpen();
      return;
    }
    hasJoinPasswd ? onPasswordModalOpen() : handleParticipateBtnClick();
  };

  return (
    <>
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
                  책: {book.title}
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
        {isOwner ? (
          <Flex justify="space-around">
            <Button
              w="48%"
              h="4.5rem"
              fontSize="md"
              fontWeight="600"
              borderRadius="1.2rem"
              color="main"
              border="0.1rem solid"
              backgroundColor="white.900"
              onClick={() => {
                router.push(`/meeting/${bookGroupId}/edit`);
              }}
            >
              모임 수정하기
            </Button>
            <Button
              w="48%"
              h="4.5rem"
              fontSize="md"
              fontWeight="600"
              borderRadius="1.2rem"
              color="red.900"
              border="0.1rem solid"
              backgroundColor="white.900"
              onClick={handleMeetingDeleteButton}
            >
              모임 삭제하기
            </Button>
          </Flex>
        ) : (
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
                    handleParticipateBtnClick(password);
                    onPasswordModalClose();
                    setPassword('');
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
            </BottomSheet>
          </>
        )}
      </Box>
      <LoginBottomSheet isOpen={isLoginModalOpen} onClose={onLoginModalClose} />
    </>
  );
};

export default MeetingInfo;
