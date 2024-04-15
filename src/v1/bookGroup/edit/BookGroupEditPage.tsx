import BackButton from '@/v1/base/BackButton';
import DatePicker from '@/v1/base/DatePicker';
import ErrorMessage from '@/v1/base/ErrorMessage';
import Input from '@/v1/base/Input';
import InputLength from '@/v1/base/InputLength';
import TextArea from '@/v1/base/TextArea';
import TopNavigation from '@/v1/base/TopNavigation';

// type GroupEditFormValues = {
//   groupTitle: string;
//   groupIntroduce: string;
//   startDate: string;
//   endDate: string;
// };

const BookGroupEditPage = () => {
  return (
    <>
      <TopNavigation>
        <TopNavigation.LeftItem>
          <BackButton />
        </TopNavigation.LeftItem>
        <TopNavigation.CenterItem>
          <h1 className="text-md text-black-900">모임 수정하기</h1>
        </TopNavigation.CenterItem>
        <TopNavigation.RightItem>
          <button className="font-bold text-main-900">완료</button>
        </TopNavigation.RightItem>
      </TopNavigation>

      <form className="mt-[2.5rem] flex flex-col gap-[3.2rem]">
        <section className="flex flex-col gap-[0.5rem]">
          <Input
            inputStyle="line"
            fontSize="large"
            defaultValue={'api에서 받을 것'}
          />
          <div className="flex flex-row-reverse items-center justify-between">
            <InputLength currentLength={21} isError={true} maxLength={20} />
            <ErrorMessage>{'error'}</ErrorMessage>
          </div>
        </section>

        <section className="flex flex-col gap-[0.6rem]">
          <h2 className="text-md text-black-700">활동 내용</h2>
          <TextArea />
          <div className="flex flex-row-reverse items-center justify-between">
            <InputLength currentLength={30} isError={true} maxLength={500} />
            <ErrorMessage>{'error'}</ErrorMessage>
          </div>
        </section>

        <section className="flex justify-between">
          <div>
            <h2 className="text-md text-black-500">모임 시작일</h2>
            <p className="text-xs text-placeholder">
              모임 시작일은 수정할 수 없어요
            </p>
          </div>
          <DatePicker name="startDate" />
        </section>

        <section className="flex justify-between">
          <h2 className="text-md text-black-700">모임 종료일</h2>
          <DatePicker name="endDate" />
        </section>
      </form>
    </>
  );
};

export default BookGroupEditPage;
