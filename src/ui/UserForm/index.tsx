import { Avatar, Box, Flex, useTheme } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import UserInput from './UserInput/index';
import { emailRule, jobRule, nickNameRule } from '@/constants/FormRule';

const UserForm = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      nickname: '',
      email: '',
      job: '',
    },
  });

  const onUserFormSubmit: Parameters<typeof handleSubmit>[0] = async ({
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
    <Box as="form" w="100%" px="2rem" onSubmit={handleSubmit(onUserFormSubmit)}>
      <Flex direction="column" gap="1rem" align="center">
        {/* TODO: API 받으면 프로필 이미지 구현 */}
        <Avatar w="6rem" h="6rem" />
        <UserInput
          label="닉네임"
          id="nickname"
          register={register('nickname', nickNameRule)}
          error={errors.nickname}
          resetField={() => resetField('nickname')}
        />
        <UserInput
          label="이메일"
          id="email"
          register={register('email', emailRule)}
          error={errors.email}
          resetField={() => resetField('email')}
        />
        {/* #TODO: API 받으면 셀렉트 박스로 구현 */}
        <UserInput
          label="직군 / 직업"
          id="job"
          register={register('job', jobRule)}
          error={errors.job}
          resetField={() => resetField('job')}
        />
        {/* #TODO: 책장 컴포넌트 구현되면 연결 */}
      </Flex>
      <Box
        as="button"
        w="100%"
        mt="2rem"
        px="2rem"
        py="1rem"
        disabled={isSubmitting || !isValid}
        color={theme.colors.main}
        border="1px solid"
        borderRadius="5rem"
        _disabled={{
          color: `${theme.colors.black['500']}`,
          border: '1px solid',
        }}
      >
        프로필 수정
      </Box>
    </Box>
  );
};

export default UserForm;
