import DatePicker from '@/v1/base/DatePicker';
import ErrorMessage from '@/v1/base/ErrorMessage';
import Input from '@/v1/base/Input';
import InputLength from '@/v1/base/InputLength';
import RadioButton from '@/v1/base/RadioButton';
import Switch from '@/v1/base/Switch';
import TextArea from '@/v1/base/TextArea';
import BookInfoCard from '../../BookInfoCard';

const SetUpDetailStep = () => {
  return (
    <div className="flex flex-col gap-[3.2rem]">
      <section className="flex flex-col gap-[0.5rem]">
        <Input fontSize="large" inputStyle="line" error={true} />
        <div className="flex flex-row-reverse justify-between gap-[0.4rem]">
          <InputLength maxLength={20} isError={true} />
          {true && <ErrorMessage>{'마크업용 에러 표시'}</ErrorMessage>}
        </div>
      </section>

      <section>
        <BookInfoCard removable={true} />
      </section>

      <section className="flex flex-col gap-[1.6rem]">
        <h2>활동 내용</h2>
        <>
          <TextArea
            count={true}
            placeholder="독서모임에서 어떤 활동을 할 계획인지 자세히 설명해주세요."
          />
        </>
      </section>

      <section className="flex flex-col gap-[1.6rem]">
        <h2>최대 인원</h2>
        <div className="inline-flex w-[23rem] flex-wrap gap-[1rem]">
          <RadioButton value="제한없음" />
          <RadioButton value="50명" />
          <RadioButton value="100명" />
          <RadioButton value="200명" />
          <RadioButton value="500명" />
          <RadioButton value="직접 입력" />
        </div>
        {false && <Input />}
      </section>

      <section className="flex items-center justify-between">
        <h2>모임 시작일</h2>
        <DatePicker />
      </section>

      <section className="flex items-center justify-between">
        <h2>모임 종료일</h2>
        <DatePicker />
      </section>

      <section className="flex items-start justify-between">
        <div className="flex min-w-0 flex-col gap-[0.3rem]">
          <h2>댓글 공개 여부</h2>
          <p className="text-xs text-placeholder">
            모임에 가입하지 않은 사람도 댓글을 볼 수 있어요.
          </p>
        </div>
        <Switch />
      </section>
    </div>
  );
};

export default SetUpDetailStep;
