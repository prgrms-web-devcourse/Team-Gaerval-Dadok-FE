import { useFormContext } from 'react-hook-form';

import Input from '@/v1/base/Input';
import InputLength from '@/v1/base/InputLength';
import ErrorMessage from '@/v1/base/ErrorMessage';

const BookGroupEditTitleForm = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<{ groupTitle: string }>();

  return (
    <section className="flex flex-col gap-[0.5rem]">
      <Input
        inputStyle="line"
        fontSize="large"
        {...register('groupTitle', {
          required: '모임 제목을 입력해주세요',
          minLength: {
            value: 2,
            message: '모임 제목을 2자 이상 입력해 주세요',
          },
          maxLength: {
            value: 30,
            message: '모임 제목을 30자 이하 입력해 주세요',
          },
        })}
      />
      <div className="flex flex-row-reverse items-center justify-between">
        <InputLength
          currentLength={watch('groupTitle')?.length}
          isError={!!errors.groupTitle}
          maxLength={30}
        />
        {errors.groupTitle && (
          <ErrorMessage>{errors.groupTitle.message}</ErrorMessage>
        )}
      </div>
    </section>
  );
};

export default BookGroupEditTitleForm;
