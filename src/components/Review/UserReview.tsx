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
    <div className="w-full border-b border-solid border-[#D8D8D8] text-sm">
      <div className="mb-3 grid w-full auto-cols-min grid-cols-3 grid-cols-[min-content_auto_auto] grid-rows-2 items-center">
        <div className="row-span-2 mr-1 flex w-[34px]">
          <Profile size="small" nickname={nickname} src={src} label={false} />
        </div>
        <p>{nickname}</p>
        <span className="justify-self-end text-sub-color2">{date}</span>
        <Review average={average} />
      </div>
      <p className="mb-[0.38rem] text-sub-color2">{title}</p>
      <p className="mb-6">{content}</p>
    </div>
  );
};

export default UserReview;
