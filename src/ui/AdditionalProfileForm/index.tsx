import { useToast } from '@/hooks/toast';
import useMyProfileMutation from '@/queries/user/useMyProfileMutation';
import { APIJobGroup } from '@/types/job';
import { APIUser } from '@/types/user';
import { Box, useTheme, VStack } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';

interface AdditionalProfileFormProps {
  profile: Pick<APIUser, 'nickname' | 'job'>;
  jobGroups: APIJobGroup[];
}

const AdditionalProfileForm = ({
  jobGroups,
  profile,
}: AdditionalProfileFormProps) => {
  const theme = useTheme();
  const myProfileMutation = useMyProfileMutation();
  const router = useRouter();

  const { showToast } = useToast();

  const onSubmit: Parameters<typeof methods.handleSubmit>[0] = ({
    nickname,
    jobGroup,
    job,
  }) => {
    myProfileMutation.mutateAsync(
      { nickname, job: { jobGroup, jobName: job } },
      {
        onSuccess: () => {
          router.replace('/profile/me');
        },
        onError: error => {
          if (isAxiosError(error) && error.response) {
            const { message } = error.response.data;
            message && showToast({ message });
          }
        },
      }
    );
  };

  const methods = useForm({
    mode: 'all',
    defaultValues: {
      nickname: profile.nickname || '',
      jobGroup: profile.job.jobGroupName || '',
      job: profile.job.jobName || '',
    },
  });

  return (
    <FormProvider {...methods}>
      <Box as="form" w="100%" onSubmit={methods.handleSubmit(onSubmit)}>
        <VStack gap="1rem">
          <FormInput label="닉네임" name="nickname" />
          <FormSelect label="직군" name="jobGroup">
            {jobGroups.map(({ name, koreanName }) => (
              <option key={name} value={name}>
                {koreanName}
              </option>
            ))}
          </FormSelect>
          <FormSelect label="직업" name="job">
            {jobGroups
              .find(({ name }) => name === methods.watch('jobGroup'))
              ?.jobs.map(({ name, koreanName }) => (
                <option key={name} value={name}>
                  {koreanName}
                </option>
              ))}
          </FormSelect>
        </VStack>
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
          저장
        </Box>
      </Box>
    </FormProvider>
  );
};

export default AdditionalProfileForm;
