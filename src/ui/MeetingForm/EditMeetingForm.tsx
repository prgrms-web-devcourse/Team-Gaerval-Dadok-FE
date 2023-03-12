import { Box, Flex, Image, useTheme } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';

import FormInput from '@/ui/FormInput';
import { APIMeetingDetail } from '@/types/meetingDetail';
import MeetingAPI from '@/apis/meetingg';
import { useRouter } from 'next/router';

interface EditMeetingFormProps {
  meeting: APIMeetingDetail;
}

const EditMeetingForm = ({ meeting }: EditMeetingFormProps) => {
  const theme = useTheme();
  const router = useRouter();
  const methods = useForm({
    mode: 'all',
    defaultValues: {
      title: meeting.title,
      introduce: meeting.introduce,
      startDate: meeting.startDate,
      maxMemberCount: meeting.maxMemberCount,
      endDate: meeting.endDate,
    },
  });

  const onSubmit: Parameters<typeof methods.handleSubmit>[0] = async ({
    title,
    introduce,
    maxMemberCount,
    endDate,
  }) => {
    try {
      await MeetingAPI.patchMeetingDetailInfo({
        bookGroupId: meeting.bookGroupId,
        meeting: { title, introduce, endDate, maxMemberCount },
      });

      router.push(`/meeting/${meeting.bookGroupId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <Box as="form" w="100%" onSubmit={methods.handleSubmit(onSubmit)}>
          <Box fontSize="md" maxH="18rem" w="fit-content" mx="auto">
            <Image src={meeting.book.imageUrl} alt="book-cover" />
          </Box>
          <Flex direction="column" gap="2rem" align="center">
            <FormInput label="제목" name="title" />
            <FormInput label="설명" name="introduce" />
            <FormInput label="시작일" name="startDate" type="date" disabled />
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
            fontWeight="bold"
            _disabled={{
              color: `${theme.colors.black['500']}`,
              border: '1px solid',
            }}
          >
            모임 수정하기
          </Box>
        </Box>
      </FormProvider>
    </>
  );
};

export default EditMeetingForm;
