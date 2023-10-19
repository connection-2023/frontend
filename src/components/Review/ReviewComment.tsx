import Review from './Review';
import Profile from '../Profile/Profile';

interface ReviewCommentProps {
  src: string | null;
  nickname: string;
  average: number;
  content: string;
  title: string;
  date: string;
}

const ReviewComment = ({
  src,
  nickname,
  average,
  content,
  date,
  title,
}: ReviewCommentProps) => {
  return (
    <div className="w-full border-b border-solid border-[#D8D8D8] text-sm">
      <div className="mb-3 grid w-full auto-cols-min grid-cols-3 grid-cols-[min-content_auto_auto] grid-rows-2 items-center">
        <div className="row-span-2 mr-1 flex">
          <Profile size={35} nickname={nickname} src={src} label={false} />
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

export default ReviewComment;
