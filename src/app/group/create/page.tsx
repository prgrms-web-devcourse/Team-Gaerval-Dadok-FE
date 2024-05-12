'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import type { SearchedBookWithId } from '@/types/book';
import type { APICreateGroup } from '@/types/group';

import { useFunnel } from '@/hooks/useFunnel';
import { getTodayDate } from '@/utils/date';

import { IconArrowLeft } from '@public/icons';
import TopNavigation from '@/v1/base/TopNavigation';
import { SelectBookStep } from '@/v1/bookGroup/create/steps/SelectBookStep';
import { EnterTitleStep } from '@/v1/bookGroup/create/steps/EnterTitleStep';
import { SetUpDetailStep } from '@/v1/bookGroup/create/steps/SetUpDetailStep';
import { SelectJoinTypeStep } from '@/v1/bookGroup/create/steps/SelectJoinTypeStep';

const FUNNEL_STEPS = [
  'SelectBook',
  'EnterTitle',
  'SetUpDetail',
  'SelectJoinType',
] as const;

interface FunnelValues extends APICreateGroup {
  book: SearchedBookWithId;
  queryKeyword: string;
  customMemberCount: string;
}

const GroupCreateFunnel = () => {
  const router = useRouter();
  const [Funnel, setStep, currentStep] = useFunnel(FUNNEL_STEPS, {
    initialStep: 'SelectBook',
  });

  const methods = useForm<FunnelValues>({
    mode: 'all',
    defaultValues: {
      title: '',
      introduce: '',
      maxMemberCount: 9999,
      startDate: getTodayDate(),
      endDate: '',
      isPublic: false,
      hasJoinPasswd: false,
      joinQuestion: '',
      joinPasswd: '',
    },
  });

  const handleBackButtonClick = () => {
    const currentStepIndex = FUNNEL_STEPS.indexOf(currentStep);

    if (currentStepIndex === 0 || currentStepIndex === -1) {
      router.back();
    } else {
      setStep(FUNNEL_STEPS[currentStepIndex - 1]);
    }

    return;
  };

  return (
    <FormProvider {...methods}>
      <TopNavigation>
        <TopNavigation.LeftItem>
          <IconArrowLeft onClick={handleBackButtonClick} />
        </TopNavigation.LeftItem>
      </TopNavigation>

      <form>
        <Funnel>
          <Funnel.Step name="SelectBook">
            <SelectBookStep onNextStep={() => setStep('EnterTitle')} />
          </Funnel.Step>
          <Funnel.Step name="EnterTitle">
            <EnterTitleStep onNextStep={() => setStep('SetUpDetail')} />
          </Funnel.Step>
          <Funnel.Step name="SetUpDetail">
            <SetUpDetailStep
              goToSelectBookStep={() => setStep('SelectBook')}
              onNextStep={() => setStep('SelectJoinType')}
            />
          </Funnel.Step>
          <Funnel.Step name="SelectJoinType">
            <SelectJoinTypeStep onSubmit={() => console.log} />
          </Funnel.Step>
        </Funnel>
      </form>
    </FormProvider>
  );
};

export default GroupCreateFunnel;
