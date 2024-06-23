import { useFormContext } from 'react-hook-form';

import type { APIEditBookGroup } from '@/types/group';

import Input from '@/components/common/Input';
import InputLength from '@/components/common/InputLength';
import ErrorMessage from '@/components/common/ErrorMessage';

type EditTitleFormTypes = Pick<APIEditBookGroup, 'title'>;

const BookGroupEditTitleForm = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<EditTitleFormTypes>();

  return (
    <section className="flex flex-col gap-[0.5rem]">
      <Input
        inputStyle="line"
        fontSize="large"
        {...register('title', {
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
          currentLength={watch('title')?.length}
          isError={!!errors.title}
          maxLength={30}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </div>
    </section>
  );
};

export default BookGroupEditTitleForm;
