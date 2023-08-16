import { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { IconClose, IconKakao } from '@public/icons';
import Button from '@/ui/Base/Button';
import BottomSheet from '@/ui/Base/BottomSheet';
import useDisclosure from '@/hooks/useDisclosure';

const meta: Meta<typeof BottomSheet> = {
  title: 'Base/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
};

const DefaultBottomSheet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>기본 바텀시트 열기</Button>
      <BottomSheet isShow={isOpen} onClose={onClose}>
        <p className="text-center text-lg">바텀시트 예시</p>
      </BottomSheet>
    </>
  );
};

const LoginBottomSheet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>로그인 바텀시트 열기</Button>
      <BottomSheet isShow={isOpen} onClose={onClose}>
        <div
          className="absolute right-0 top-0 mr-[2rem] mt-[2rem] cursor-pointer"
          onClick={onClose}
        >
          <IconClose />
        </div>
        <div className="m-auto flex w-full max-w-[38rem] flex-col items-center gap-[2.2rem] px-[2rem] pt-[5rem]">
          <Image
            width="60"
            height="61"
            src="/icons/logo-with-text.svg"
            alt="logo"
          />
          <p className="text-lg font-bold text-black-700">
            로그인이 필요한 서비스에요!
          </p>
          <p className=" text-center text-sm font-normal text-placeholder">
            간편하게 카카오로 로그인을 하고,
            <br />
            <span className=" text-main-900">다독다독</span>의 다양한 기능을
            이용해보세요.
          </p>
          <Button colorScheme="kakao" size="full">
            <div className="flex w-full items-center justify-center gap-[0.7rem]">
              <div className="h-auto w-[1.6rem]">
                <IconKakao />
              </div>
              <span className="text-md font-normal">카카오 로그인</span>
            </div>
          </Button>
        </div>
      </BottomSheet>
    </>
  );
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  render: DefaultBottomSheet,
};

export const Login: Story = {
  render: LoginBottomSheet,
};
