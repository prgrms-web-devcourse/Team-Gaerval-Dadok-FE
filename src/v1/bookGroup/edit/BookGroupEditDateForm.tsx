import { useFormContext } from 'react-hook-form';

import type { APIEditBookGroup } from '@/types/group';

import DatePicker from '@/v1/base/DatePicker';
import ErrorMessage from '@/v1/base/ErrorMessage';

type EditDateFormTypes = Pick<APIEditBookGroup, 'startDate' | 'endDate'>;

const BookGroupEditDateForm = () => {
  const {
    register,
    formState: { errors, defaultValues },
  } = useFormContext<EditDateFormTypes>();

  return (
    <>
      <section className="flex justify-between">
        <div>
          <h2 className="text-black-500">모임 시작일</h2>
          <p className="pt-[0.3rem] text-placeholder font-caption1-regular">
            모임 시작일은 수정할 수 없어요
          </p>
        </div>
        <DatePicker disabled={true} {...register('startDate')} />
      </section>
      <section className="flex flex-col gap-[0.5rem]">
        <div className="flex justify-between">
          <h2 className="text-black-700">모임 종료일</h2>
          <DatePicker
            {...register('endDate', {
              required: { value: true, message: '종료일을 입력해주세요' },
              min: {
                value: defaultValues?.startDate as string,
                message: '종료일은 시작일보다 늦어야 해요',
              },
            })}
          />
        </div>
        <div>
          {errors.endDate && (
            <ErrorMessage>{errors.endDate.message}</ErrorMessage>
          )}
        </div>
      </section>
    </>
  );
};

export default BookGroupEditDateForm;
