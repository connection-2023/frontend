'use client';
import { useRouter } from 'next/navigation';
import { ChatSVG } from '@/icons/svg';
import { Button } from '@/components/Button/Button';

const ProfileButtons = ({ id }: { id: number }) => {
  const router = useRouter();
  // 추후 Link 사용으로 변경 예정
  return (
    <>
      <Button
        mode="default"
        size="medium"
        onClick={() => {
          router.push(`/Instructor/${id}`);
        }}
      >
        강사 프로필
      </Button>
      {/* 채팅으로 링크 연결하기 */}
      <Button mode="default" size="medium" onClick={() => {}}>
        <ChatSVG className="mr-[3px]" />
        문의하기
      </Button>
    </>
  );
};

export default ProfileButtons;
