import { useFormContext } from 'react-hook-form';

import ErrorMessage from '@/v1/base/ErrorMessage';
import TextArea from '@/v1/base/TextArea';
import { APIEditBookGroup } from '@/types/group';

type EditIntroduceFormTypes = Pick<APIEditBookGroup, 'introduce'>;

const BookGroupEditIntroduceForm = () => {
  const {
    register,
    formState: { errors, defaultValues },
  } = useFormContext<EditIntroduceFormTypes>();

  return (
    <section className="flex flex-col gap-[0.6rem]">
      <h2 className="text-md text-black-700">활동 내용</h2>
      <TextArea
        count={true}
        maxLength={500}
        defaultValue={defaultValues?.introduce}
        {...register('introduce', {
          required: '모임 설명을 입력해주세요',
          minLength: {
            value: 10,
            message: '모임 설명을 10자 이상 입력해주세요',
          },
          maxLength: {
            value: 500,
            message: '모임 설명은 500자를 넘을 수 없어요',
          },
        })}
      >
        <ErrorMessage>{errors.introduce?.message}</ErrorMessage>
      </TextArea>
    </section>
  );
};

export default BookGroupEditIntroduceForm;