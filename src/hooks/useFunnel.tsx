'use client';

import { useEffect, useMemo } from 'react';

import type { FunnelProps, StepProps } from '@/v1/base/Funnel/Funnel';
import { assert } from '@/utils/assert';

import { Funnel, Step } from '@/v1/base/Funnel/Funnel';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type NonEmptyArray<T> = readonly [T, ...T[]];

type SetStepOptions = {
  stepChangeType?: 'push' | 'replace';
  preserveQuery?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query?: Record<string, any>;
};

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

export const useFunnel = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
  options?: {
    stepQueryKey?: string;
    initialStep?: Steps[number];
    onStepChange?: (name: Steps[number]) => void;
  }
): readonly [
  FunnelComponent<Steps>,
  (step: Steps[number], options?: SetStepOptions) => void
] => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const step = searchParams.get('funnel-step') as unknown as string;
  const stepQueryKey = options?.stepQueryKey ?? DEFAULT_STEP_QUERY_KEY;

  useEffect(() => {
    if (options?.initialStep) {
      router.push(pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  assert(steps.length > 0, 'steps가 비어있습니다.');

  const FunnelComponent = useMemo(
    () =>
      Object.assign(
        function RouteFunnel(props: RouteFunnelProps<Steps>) {
          const step =
            (searchParams.get('funnel-step') as unknown as string) ??
            options?.initialStep;

          assert(
            step != null,
            `표시할 스텝을 ${stepQueryKey} 쿼리 파라미터에 지정해주세요. 쿼리 파라미터가 없을 때 초기 스텝을 렌더하려면 useFunnel의 두 번째 파라미터 options에 initialStep을 지정해주세요.`
          );

          return <Funnel<Steps> steps={steps} step={step} {...props} />;
        },
        {
          Step,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step]
  );

  /**
   * @todo
   * 관련 queryString create 함수 작성을 통한 setStepOptions 구현하기
   */
  const setStep = (step: Steps[number]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('funnel-step', `${step}`);

    return router.push(pathname + '?' + params.toString());
  };

  return [FunnelComponent, setStep] as unknown as readonly [
    FunnelComponent<Steps>,
    (step: Steps[number], options?: SetStepOptions) => Promise<void>
  ];
};
