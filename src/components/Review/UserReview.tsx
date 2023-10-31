import { LikeSVG } from '@/icons/svg';
import Review from './Review';
import Profile from '../ProfileImage/ProfileImage';

interface UserReviewProps {
  src: string | null;
  nickname: string;
  average: number;
  content: string;
  title: string;
  date: string;
}

const UserReview = ({
  src,
  nickname,
  average,
  content,
  date,
  title,
}: UserReviewProps) => {
  return (
    <div className="w-full rounded-[0.31rem] border-b border-solid border-[#D8D8D8] text-sm shadow-float">
      <div className="flex w-full justify-between p-[0.8rem]">
        <div className="mr-1.5 flex flex w-[34px] items-center">
          <Profile size="small" nickname={nickname} src={src} label={false} />
        </div>
        <div className="flex flex-col">
          <p>{nickname}</p>
          <Review average={average} size="small" />
        </div>

        <div className="flex h-fit w-full flex-nowrap items-baseline items-baseline justify-end whitespace-nowrap text-sub-color2">
          <span>수강일 {date}</span>
          <button className="ml-3 box-border h-6 cursor-pointer rounded-[0.31rem] border border-solid border-sub-color4 px-1.5 text-sm font-normal hover:text-sub-color3">
            신고
          </button>
        </div>
      </div>

      <p className="mb-2 px-[0.8rem] text-sm">{content}</p>
      <div className="flex items-center justify-between border-t border-solid border-[#E8E8E8] p-[0.8rem]">
        <p className="text-sub-color2">{title}</p>
        <p className="flex items-center gap-1.5 text-sm font-semibold text-sub-color2">
          <LikeSVG
            width="15"
            height="14"
            className="cursor-pointer fill-sub-color2 hover:fill-sub-color1"
          />
          10
        </p>
      </div>
    </div>
  );
};

export default UserReview;
