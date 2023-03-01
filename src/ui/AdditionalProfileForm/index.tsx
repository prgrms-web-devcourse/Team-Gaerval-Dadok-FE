import { Box, useTheme, VStack } from '@chakra-ui/react';
import type { OptionHTMLAttributes } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FormSelect from '../FormSelect';

const AdditionalProfileForm = () => {
  const theme = useTheme();

  const jobGroups: OptionHTMLAttributes<HTMLOptionElement>[] = [];
  const jobs: {
    [index: string]: OptionHTMLAttributes<HTMLOptionElement>[];
  } = {};

  // TODO: API 연결
  API_JOBS_RESPONSE.jobs.forEach(({ jobGroup, jobNames }) => {
    jobGroups.push({ value: jobGroup.name, label: jobGroup.koreanName });
    jobs[jobGroup.name] = jobNames.map(({ koreanName, name }) => ({
      value: name,
      label: koreanName,
    }));
  });

  const onSubmit: Parameters<typeof methods.handleSubmit>[0] = ({
    jobGroup,
    job,
  }) => {
    // TODO: API 연결!
    console.log(jobGroup);
    console.log(job);
  };

  const methods = useForm({
    mode: 'all',
  });

  return (
    <FormProvider {...methods}>
      <Box as="form" w="100%" onSubmit={methods.handleSubmit(onSubmit)}>
        <VStack gap="1rem">
          <FormSelect label="직군" name="jobGroup" options={jobGroups} />
          <FormSelect
            label="직업"
            name="job"
            options={jobs[methods.watch('jobGroup')] || []}
          />
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
          가입 완료
        </Box>
      </Box>
    </FormProvider>
  );
};

export default AdditionalProfileForm;

const API_JOBS_RESPONSE = {
  jobs: [
    {
      jobGroup: {
        koreanName: '개발',
        name: 'DEVELOPMENT',
      },
      jobNames: [
        {
          koreanName: '데이터 엔지니어',
          name: 'DATA_ENGINEER',
          order: 1,
        },
        {
          koreanName: '자바 개발자',
          name: 'JAVA_DEVELOPER',
          order: 2,
        },
        {
          koreanName: '.NET 개발자',
          name: 'DOTNET_DEVELOPER',
          order: 3,
        },
        {
          koreanName: '시스템,네트워크 관리자',
          name: 'SYSTEM_NETWORK_ADMINISTRATOR',
          order: 4,
        },
        {
          koreanName: '백엔드 개발자',
          name: 'BACKEND_DEVELOPER',
          order: 5,
        },
        {
          koreanName: '프론트엔드 개발자',
          name: 'FRONTEND_DEVELOPER',
          order: 6,
        },
        {
          koreanName: '보안 엔지니어',
          name: 'SECURITY_ENGINEER',
          order: 7,
        },
        {
          koreanName: '하드웨어 엔지니어',
          name: 'HARDWARE_ENGINEER',
          order: 8,
        },
        {
          koreanName: 'DevOps / 시스템 관리자',
          name: 'DEVOPS',
          order: 9,
        },
        {
          koreanName: '기타',
          name: 'ETC',
          order: 10,
        },
      ],
    },
    {
      jobGroup: {
        koreanName: '경영/비즈니스',
        name: 'MANAGEMENT_BUSINESS',
      },
      jobNames: [
        {
          koreanName: '비서',
          name: 'SECRETARY',
          order: 1,
        },
        {
          koreanName: '운영 매니저',
          name: 'OPERATION_MANAGER',
          order: 2,
        },
        {
          koreanName: '오피스 관리 / 매니저',
          name: 'OFFICE_MANAGER',
          order: 3,
        },
        {
          koreanName: 'PM/PO',
          name: 'PM_PO',
          order: 4,
        },
        {
          koreanName: '사업개발/기획자',
          name: 'BUSINESS_PLANNER',
          order: 5,
        },
        {
          koreanName: '서비스 기획자',
          name: 'SERVICE_PLANNER',
          order: 6,
        },
        {
          koreanName: '컨설턴트',
          name: 'CONSULTANT',
          order: 7,
        },
        {
          koreanName: 'CEO,Chief Executive Officer',
          name: 'CEO',
          order: 8,
        },
        {
          koreanName: 'CFO,Chief Financial Officer',
          name: 'CFO',
          order: 9,
        },
        {
          koreanName: '기타',
          name: 'ETC',
          order: 10,
        },
      ],
    },
    {
      jobGroup: {
        koreanName: '마케팅/광고',
        name: 'MARKETING_ADVERTISEMENT',
      },
      jobNames: [
        {
          koreanName: '브랜드 마케터',
          name: 'BRAND_MARKETER',
          order: 1,
        },
        {
          koreanName: '카피라이터',
          name: 'COPYWRITER',
          order: 2,
        },
        {
          koreanName: '마케터',
          name: 'MARKETER',
          order: 3,
        },
        {
          koreanName: 'PR 전문가',
          name: 'PR_EXPERT',
          order: 4,
        },
        {
          koreanName: '마케팅 전략 기획자',
          name: 'MARKETING_PLANNER',
          order: 5,
        },
        {
          koreanName: '소셜 마케터',
          name: 'SOCIAL_MEDIA_MARKETER',
          order: 6,
        },
        {
          koreanName: '광고 기획자(AE)',
          name: 'ADVERTISING_PLANNER_AE',
          order: 7,
        },
        {
          koreanName: 'CMO,Chief Marketing Officer',
          name: 'CMO',
          order: 8,
        },
        {
          koreanName: 'CBO,Chief Brand Officer',
          name: 'CBO',
          order: 9,
        },
        {
          koreanName: '기타',
          name: 'ETC',
          order: 10,
        },
      ],
    },
    {
      jobGroup: {
        koreanName: '영업',
        name: 'SALES',
      },
      jobNames: [
        {
          koreanName: '영업',
          name: 'SALES',
          order: 1,
        },
        {
          koreanName: '주요고객사 담당자',
          name: 'KEY_ACCOUNT_MANAGER',
          order: 2,
        },
        {
          koreanName: '세일즈 엔지니어',
          name: 'SALES_ENGINEER',
          order: 3,
        },
        {
          koreanName: '영업 관리자',
          name: 'SALES_MANAGER',
          order: 4,
        },
        {
          koreanName: '솔루션 컨설턴트',
          name: 'SOLUTION_CONSULTANT',
          order: 5,
        },
        {
          koreanName: '고객성공매니저',
          name: 'CUSTOMER_SUCCESS_MANAGER',
          order: 6,
        },
        {
          koreanName: '기타',
          name: 'ETC',
          order: 7,
        },
      ],
    },
    {
      jobGroup: {
        koreanName: '고객서비스 / 리테일',
        name: 'CUSTOMER_SERVICE_RETAIL',
      },
      jobNames: [
        {
          koreanName: 'CS 어드바이저',
          name: 'CS_ADVISOR',
          order: 1,
        },
        {
          koreanName: '승무원',
          name: 'FLIGHT_ATTENDANT',
          order: 2,
        },
        {
          koreanName: 'AS 기술자',
          name: 'AS_TECHNICIAN',
          order: 3,
        },
        {
          koreanName: '이벤트 기획자',
          name: 'EVENT_PLANNER',
          order: 4,
        },
        {
          koreanName: '플로리스트',
          name: 'FLORIST',
          order: 5,
        },
        {
          koreanName: '여행 에이전트',
          name: 'TRAVEL_AGENT',
          order: 6,
        },
        {
          koreanName: '매장 관리자',
          name: 'STORE_MANAGER',
          order: 7,
        },
        {
          koreanName: '매장점원',
          name: 'STORE_STAFF',
          order: 8,
        },
        {
          koreanName: '피부관리사',
          name: 'SKIN_CARE_SPECIALIST',
          order: 9,
        },
        {
          koreanName: '기타',
          name: 'ETC',
          order: 10,
        },
      ],
    },
  ],
};
