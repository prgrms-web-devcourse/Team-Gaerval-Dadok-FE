import { Avatar, Box, Flex, useTheme } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import UserInput from './UserInput/index';

const UserForm = () => {
  const methods = useForm({
    mode: 'all',
    defaultValues: {
      nickname: '',
      email: '',
      job: '',
    },
  });

  const onUserFormSubmit: Parameters<typeof methods.handleSubmit>[0] = async ({
    nickname,
    email,
    job,
  }) => {
    /**
     * 딜레이 테스트 함수
     * @returns
     */
    const delay = () => {
      return new Promise<void>(resolve =>
        setTimeout(() => {
          console.log('submit');
          resolve();
        }, 1000)
      );
    };

    await delay();

    // TODO: 프로필 수정 API 연동
    console.log(nickname);
    console.log(email);
    console.log(job);
  };

  const theme = useTheme();

  return (
    <FormProvider {...methods}>
      <Box
        as="form"
        w="100%"
        px="2rem"
        onSubmit={methods.handleSubmit(onUserFormSubmit)}
      >
        <Flex direction="column" gap="1rem" align="center">
          {/* TODO: API 받으면 프로필 이미지 구현 */}
          <Avatar w="8rem" h="8rem" />
          <UserInput label="닉네임" name="nickname" />
          <UserInput label="이메일" name="email" />
          {/* #TODO: API 받으면 셀렉트 박스로 구현 */}
          <UserInput label="직군 / 직업" name="job" />
          {/* #TODO: 책장 컴포넌트 구현되면 연결 */}
        </Flex>
        <Box
          as="button"
          w="100%"
          mt="2rem"
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
          프로필 수정
        </Box>
      </Box>
    </FormProvider>
  );
};

export default UserForm;
