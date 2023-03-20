import { VStack, Text, Highlight, Link, Image, Box } from '@chakra-ui/react';

import Button from '@/ui/common/Button';

interface GuideMessageProps {
  isAuthed: boolean;
  isPublic: boolean;
  isGroupMember: boolean;
}

const GuideMessage = ({
  isAuthed,
  isPublic,
  isGroupMember,
}: GuideMessageProps) => {
  const kakaoUrl = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorize/kakao?redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_REDIRECT_URI}`;

  return (
    <Box>
      <Box>
        {!isAuthed && !isPublic ? (
          <VStack h="20rem" direction="column" gap="1rem">
            <Text
              w="100%"
              textAlign="center"
              mt="4rem"
              fontSize="lg"
              color="black.700"
            >
              <Highlight query="로그인" styles={{ color: 'main' }}>
                로그인 후 이용해 주세요
              </Highlight>
            </Text>
            <Link href={kakaoUrl} style={{ width: '100%' }}>
              <Button scheme="kakao" fullWidth>
                <Image
                  src="/images/kakao.svg"
                  alt="카카오 로고"
                  width={21}
                  height={19}
                />
                카카오 로그인
              </Button>
            </Link>
          </VStack>
        ) : (
          ''
        )}
      </Box>
      <Box>
        {isAuthed && !isPublic && !isGroupMember ? (
          <Text
            h="10rem"
            w="100%"
            textAlign="center"
            mt="4rem"
            fontSize="lg"
            color="black.700"
          >
            <Highlight query="모임에 참여한 사람" styles={{ color: 'main' }}>
              이 모임은 모임에 참여한 사람만
            </Highlight>
            <br />
            글을 볼 수 있어요
          </Text>
        ) : (
          ''
        )}
      </Box>
    </Box>
  );
};

export default GuideMessage;
