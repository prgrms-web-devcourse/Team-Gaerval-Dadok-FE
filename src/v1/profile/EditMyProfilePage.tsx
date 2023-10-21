import Input from '@/ui/Base/Input';
import Select from '@/ui/Base/Select';
import TopNavigation from '@/ui/Base/TopNavigation';
import { IconClose } from '@public/icons';
import { SubmitHandler, useForm } from 'react-hook-form';

type DefaultValues = {
  name: string;
  jobGroup: string;
  job: string;
};

/**
 * @todo
 * register 추가
 * validation 추가
 * error 추가
 * submit 동작 확인
 */

const EditMyProfilePage = () => {
  const {
    // register,
    handleSubmit,
    // control,
    // formState: { errors },
  } = useForm<DefaultValues>({
    mode: 'all',
  });

  const handleSubmitForm: SubmitHandler<DefaultValues> = ({
    name,
    jobGroup,
    job,
  }) => {
    return alert(`닉네임: ${name}, 직군: ${jobGroup}, 직업: ${job}`);
  };

  return (
    <div
      className={`animate-page-transition h-screen w-full max-w-[43rem] overflow-auto p-[2rem]`}
    >
      <TopNavigation>
        <TopNavigation.LeftItem>
          <IconClose className="h-[2rem] w-[2rem] cursor-pointer fill-black-900" />
        </TopNavigation.LeftItem>
        <TopNavigation.CenterItem textAlign="center">
          <span className="text-md font-normal text-black-900">
            프로필 수정
          </span>
        </TopNavigation.CenterItem>
        <TopNavigation.RightItem>
          <span
            onClick={handleSubmit(handleSubmitForm)}
            className="cursor-pointer text-md font-bold text-main-900"
          >
            완료
          </span>
        </TopNavigation.RightItem>
      </TopNavigation>

      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="mt-[9.2rem] flex w-full flex-col gap-[3.2rem]"
      >
        <div className="flex flex-col gap-[1rem]">
          <span className="text-md font-normal text-black-700">닉네임</span>
          <Input />
        </div>
        <div>
          <span className="text-md font-normal text-black-700">직업/직군</span>
          <Select />
          <Select />
        </div>
      </form>
    </div>
  );
};

export default EditMyProfilePage;
