'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import type { CreateBookGroupFormValues } from '@/components/bookGroup/create/types';
import useCreateBookGroupMutation from '@/queries/group/useCreateBookGroupMutation';

import { useFunnel } from '@/hooks/useFunnel';
import useDisclosure from '@/hooks/useDisclosure';
import useToast from '@/components/common/Toast/useToast';
import { getTodayDate } from '@/utils/date';
import { isAxiosErrorWithCustomCode } from '@/utils/helpers';
import { SERVICE_ERROR_MESSAGE } from '@/constants';

import { IconClose } from '@public/icons';
import TopNavigation from '@/components/common/TopNavigation';
import Stepper from '@/components/common/Stepper';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import {
  EnterTitleStep,
  SelectBookStep,
  SelectJoinTypeStep,
  SetUpDetailStep,
} from '@/components/bookGroup/create/steps';

const FUNNEL_STEPS = [
  'SelectBook',
  'EnterTitle',
  'SetUpDetail',
  'SelectJoinType',
] as const;

const steps = [
  { label: '도서선택' },
  { label: '모임이름' },
  { label: '모임정보' },
  { label: '가입유형' },
] as const;

const CreateBookGroupFunnel = () => {
  const router = useRouter();
  const [Funnel, setStep, currentStep] = useFunnel(FUNNEL_STEPS, {
    initialStep: 'SelectBook',
  });
  const stepIndex = FUNNEL_STEPS.indexOf(currentStep);
  const activeStep = stepIndex !== -1 ? stepIndex : 0;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { show: showToast } = useToast();
  const { mutate } = useCreateBookGroupMutation();

  const methods = useForm<CreateBookGroupFormValues>({
    mode: 'all',
    defaultValues: {
      title: '',
      maxMemberCount: 9999,
      startDate: getTodayDate(),
      isPublic: false,
      hasJoinPassword: 'false',
    },
  });

  const handleCloseButtonClick = () => {
    onClose();
    router.back();
  };

  const handleCreateGroupSubmit: SubmitHandler<
    CreateBookGroupFormValues
  > = formValues => {
    const requestBody = {
      bookId: formValues.book.bookId,
      title: formValues.title,
      introduce: formValues.introduce,
      maxMemberCount:
        formValues.maxMemberCount !== 'custom'
          ? formValues.maxMemberCount
          : formValues.customMemberCount,
      startDate: formValues.startDate,
      endDate: formValues.endDate,
      isPublic: formValues.isPublic,
      hasJoinPasswd: formValues.hasJoinPassword === 'true' ? true : false,
      joinQuestion: formValues.joinQuestion,
      joinPasswd: formValues.joinPassword,
    };

    mutate(requestBody, {
      onSuccess: data => {
        router.replace(`/group/${data.bookGroupId}`);
        showToast({ type: 'success', message: '독서모임을 생성했어요! 🎉' });

        return;
      },
      onError: error => {
        if (isAxiosErrorWithCustomCode(error)) {
          const { code } = error.response.data;
          const message = SERVICE_ERROR_MESSAGE[code];

          showToast({ type: 'error', message });

          return;
        }

        showToast({
          type: 'error',
          message: '독서 모임을 생성하지 못했어요 🥲',
        });
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <TopNavigation>
        <TopNavigation.LeftItem>
          <IconClose onClick={onOpen} />
        </TopNavigation.LeftItem>
      </TopNavigation>

      <FunnelCloseModal
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleCloseButtonClick}
      />

      <div className="sticky top-[5.4rem] z-10 -ml-[2rem] w-[calc(100%+4rem)] bg-white px-[2rem] pb-[3rem] pt-[1rem]">
        <div className="relative left-1/2 w-[98%] -translate-x-1/2 ">
          <Stepper activeIndex={activeStep}>
            {steps.map(({ label }, idx) => {
              return <Stepper.Step key={idx} label={label} />;
            })}
          </Stepper>
        </div>
      </div>

      <form>
        <Funnel>
          <Funnel.Step name="SelectBook">
            <SelectBookStep onNextStep={() => setStep('EnterTitle')} />
          </Funnel.Step>
          <Funnel.Step name="EnterTitle">
            <EnterTitleStep
              onPrevStep={() => setStep('SelectBook')}
              onNextStep={() => setStep('SetUpDetail')}
            />
          </Funnel.Step>
          <Funnel.Step name="SetUpDetail">
            <SetUpDetailStep
              onPrevStep={() => setStep('EnterTitle')}
              onNextStep={() => setStep('SelectJoinType')}
              goToSelectBookStep={() => setStep('SelectBook')}
            />
          </Funnel.Step>
          <Funnel.Step name="SelectJoinType">
            <SelectJoinTypeStep
              onPrevStep={() => setStep('SetUpDetail')}
              onSubmit={methods.handleSubmit(handleCreateGroupSubmit)}
            />
          </Funnel.Step>
        </Funnel>
      </form>
    </FormProvider>
  );
};

export default CreateBookGroupFunnel;

const FunnelCloseModal = ({
  isOpen,
  onClose,
  handleSubmit,
}: {
  isOpen: boolean;
  onClose?: () => void;
  handleSubmit?: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => onClose?.()}>
      <div className="text-lg font-bold">
        독서모임 만들기를 그만할까요?
        <p className="text-xs font-normal text-black-500">
          작성한 내용은 저장되지 않아요.
        </p>
      </div>
      <div className="flex justify-end gap-[1rem]">
        <Button onClick={onClose} fill={false} colorScheme="grey" size="small">
          취소
        </Button>
        <Button onClick={handleSubmit} size="small">
          그만두기
        </Button>
      </div>
    </Modal>
  );
};
