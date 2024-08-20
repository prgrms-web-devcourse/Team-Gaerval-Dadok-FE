'use client';

import { useEffect, useMemo, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { assert } from '@/utils/assert';

import type { FunnelProps, StepProps } from '@/components/common/Funnel';
import { Funnel, Step } from '@/components/common/Funnel';

export type NonEmptyArray<T> = readonly [T, ...T[]];

type RouteFunnelProps<Steps extends NonEmptyArray<string>> = Omit<
  FunnelProps<Steps>,
  'steps' | 'step'
>;

type FunnelComponent<Steps extends NonEmptyArray<string>> = ((
  props: RouteFunnelProps<Steps>
) => JSX.Element) & {
  Step: (props: StepProps<Steps>) => JSX.Element;
};

const DEFAULT_STEP_QUERY_KEY = 'funnel-step';

/**
 * 사용자에게 초기 step을 강제하고 싶을 땐
 * option의 initialStep을 작성해 주세요.
 */
export const useFunnel = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
  options?: {
    stepQueryKey?: string;
    initialStep?: Steps[number];
    onStepChange?: (name: Steps[number]) => void;
  }
): readonly [
  FunnelComponent<Steps>,
  (step: Steps[number]) => void,
  Steps[number]
] => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const hasRunOnce = useRef(false);

  const step = searchParams.get('funnel-step') as string;
  const stepQueryKey = options?.stepQueryKey ?? DEFAULT_STEP_QUERY_KEY;

  useEffect(() => {
    if (options?.initialStep && !hasRunOnce.current) {
      hasRunOnce.current = true;
      router.replace(pathname);
    }
  }, [options?.initialStep, router, pathname]);

  assert(steps.length > 0, 'steps가 비어있습니다.');

  const FunnelComponent = useMemo(
    () =>
      Object.assign(
        function RouteFunnel(props: RouteFunnelProps<Steps>) {
          const currentStep = step ?? options?.initialStep;

          assert(
            currentStep != null,
            `표시할 스텝을 ${stepQueryKey} 쿼리 파라미터에 지정해주세요. 쿼리 파라미터가 없을 때 초기 스텝을 렌더하려면 useFunnel의 두 번째 파라미터 options에 initialStep을 지정해주세요.`
          );

          return <Funnel<Steps> steps={steps} step={currentStep} {...props} />;
        },
        {
          Step,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step]
  );

  const setStep = (step: Steps[number]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('funnel-step', `${step}`);

    return router.replace(`?${params.toString()}`, { shallow: true });
  };

  return [FunnelComponent, setStep, step] as unknown as readonly [
    FunnelComponent<Steps>,
    (step: Steps[number]) => Promise<void>,
    Steps[number]
  ];
};
