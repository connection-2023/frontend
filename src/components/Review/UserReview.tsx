'use client';
import { useMutation } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';
import {
  deleteReview,
  deleteReviewLikes,
  postReviewLikes,
} from '@/lib/apis/reviewApis';
import { useUserStore } from '@/store';
import { reloadToast } from '@/utils/reloadMessage';
import Review from './Review';
import { CloseSVG, LikeSVG } from '../../../public/icons/svg';
import Profile from '../Profile/ProfileImage';

const LikeAnimationSVG = dynamic(() => import('./LikeAnimationSVG'), {
  ssr: false,
});

interface UserReviewProps {
  src?: string | null;
  nickname: string;
  average: number;
  content: string;
  title: string;
  date: string;
  count: number;
  isLike: boolean;
  reviewId: number;
  link: string;
  userId: number;
  noneShadow?: boolean;
}

const UserReview = ({
  src,
  nickname,
  average,
  content,
  date,
  title,
  count,
  isLike,
  reviewId,
  link,
  userId,
  noneShadow,
}: UserReviewProps) => {
  const { authUser, userType } = useUserStore((state) => ({
    authUser: state.authUser,
    userType: state.userType,
  }));
  const [liked, setLiked] = useState(isLike);
  const [likeCount, setLikeCount] = useState(count);
  const router = useRouter();

  const { mutate: deleteReviewLikesMutate, isPending: likeDeletePending } =
    useMutation({
      mutationFn: () => deleteReviewLikes(reviewId),
      onSuccess: () => {
        setLikeCount((prev) => prev - 1);
        setLiked(false);
      },
    });

  const { mutate: reviewLikesMutate, isPending: likePending } = useMutation({
    mutationFn: () => postReviewLikes(reviewId),
    onSuccess: () => {
      setLikeCount((prev) => prev + 1);
      setLiked(true);
    },
  });

  const handleReport = () => {
    router.push(link);
  };

  const { mutate: deleteReviewMutate } = useMutation({
    mutationFn: () => deleteReview(reviewId),
    onSuccess: () => {
      location.reload();
      reloadToast('삭제가 완료 됐습니다.', 'success');
    },
  });

  const handleDeleteReview = () => {
    if (
      confirm(`해당 리뷰를 삭제하시겠습니까?
            
** 리뷰 제거 시 다시 재 작성이 불가합니다. **`)
    ) {
      deleteReviewMutate();
    }
  };

  const mine = userType === 'user' && Number(authUser?.id) === userId;
  const disabled = userType === 'lecturer';
  const likeLoading = likeDeletePending || likePending;

  return (
    <div
      className={`w-full rounded-md border-b border-solid border-gray-700 bg-white text-sm ${
        noneShadow ? 'shadow-none' : 'shadow-vertical'
      }`}
    >
      <div className="flex w-full justify-between p-[0.8rem]">
        <div className="mr-1.5 flex w-[34px] items-center">
          <Profile size="small" nickname={nickname} src={src} label={false} />
        </div>
        <div className="flex flex-col">
          <p>{nickname}</p>
          <Review average={average} size="small" />
        </div>

        <div className="flex h-fit w-full flex-nowrap items-baseline justify-end whitespace-nowrap text-gray-500">
          <span className="gray-300">수강일 {date}</span>
          {mine ? (
            <button className="my-auto ml-2" onClick={handleDeleteReview}>
              <CloseSVG className="size-[17px] stroke-gray-500 stroke-[3px]" />
            </button>
          ) : (
            <button
              onClick={handleReport}
              className="ml-3 box-border h-6 cursor-pointer rounded-md border border-solid border-gray-700 px-1.5 text-sm font-normal hover:text-gray-100"
              aria-label="리뷰 신고"
            >
              신고
            </button>
          )}
        </div>
      </div>

      <p className="mb-2 px-[0.8rem] text-sm">{content}</p>
      <div className="flex items-center justify-between border-t border-solid border-gray-700 p-[0.8rem]">
        <p className="text-gray-300">{title}</p>
        <button
          disabled={likeLoading || disabled}
          onClick={() =>
            liked ? deleteReviewLikesMutate() : reviewLikesMutate()
          }
          className={`group flex items-center gap-1.5 text-sm font-semibold ${
            disabled
              ? 'text-gray-500'
              : liked
              ? 'text-main-color hover:text-gray-500'
              : 'text-gray-500 hover:text-main-color'
          }`}
          aria-label="리뷰 좋아요"
        >
          {likeLoading ? (
            <LikeAnimationSVG liked={liked} />
          ) : (
            <LikeSVG
              width="15"
              height="14"
              className={
                disabled
                  ? 'fill-gray-500'
                  : liked
                  ? 'fill-main-color group-hover:fill-gray-500'
                  : 'fill-gray-500 group-hover:fill-main-color'
              }
            />
          )}
          {likeCount}
        </button>
      </div>
    </div>
  );
};

export default UserReview;
