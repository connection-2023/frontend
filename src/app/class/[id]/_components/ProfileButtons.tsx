'use client';
import { Button } from '@/components/Button/Button';
import { ChatSVG } from '@/icons/svg';

const ProfileButtons = ({ id }: { id: number }) => {
  return (
    <>
      <Button mode="default" size="medium" onClick={() => {}}>
        강사 프로필
      </Button>
      <Button mode="default" size="medium" onClick={() => {}}>
        <ChatSVG className="mr-[3px]" />
        문의하기
      </Button>
    </>
  );
};

export default ProfileButtons;
