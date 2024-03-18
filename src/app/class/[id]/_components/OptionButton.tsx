'use client';
import { OptionButtons } from '@/components/Button';
import Like from '@/components/Like/Like';

interface OptionButtonProps {
  lecturerId: number;
  postId: string;
  isLike: boolean;
  title: string;
}

const OptionButton = ({
  lecturerId,
  postId,
  isLike,
  title,
}: OptionButtonProps) => {
  return (
    <>
      <Like type="class" id={postId} isLiked={isLike} />
      <OptionButtons lecturerId={lecturerId} title={title} mode="class" />
    </>
  );
};

export default OptionButton;
