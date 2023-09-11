import Date from './Date';
import { ClassCardType } from '../../types/class';
import Like from '../Like/Like';
import Profile from '../Profile/Profile';
import Review from '../Review/Review';

const ClassCard = (props: ClassCardType) => {
  const {
    status,
    date,
    title,
    location,
    genre,
    type,
    time,
    review,
    price,
    profile,
    selectedDates,
  } = props;

  const getStatusStyles = (status: string) => {
    switch (status) {
      case '모집중':
        return 'border-[#B6B6B6] text-inherit';
      case '마감임박':
        return 'border-main-color text-main-color';
      case '마감':
        return 'border-[#B6B6B6] text-[#B6B6B6]';
      default:
        return '';
    }
  };
  return (
    <div className="flex max-h-[13.5rem] w-full max-w-[40rem] cursor-pointer whitespace-nowrap p-3.5 shadow-[1px_1px_4px_-1px_rgba(0,0,0,0.25)] hover:scale-[1.02]">
      <div className="mr-4 h-[188px] w-[297px] w-full bg-cyan-500">
        사진 컴포넌트
      </div>
      <div className="flex w-full flex-col text-[#414141]">
        <div className="mb-3 flex w-full items-center">
          <div
            className={`flex border-2 border-solid px-1.5 py-1.5 text-sm font-bold ${getStatusStyles(
              status,
            )}`}
          >
            {status}
          </div>

          <Date selectedDates={selectedDates} />

          <span className="text-sm">{date}</span>
          <div className="ml-auto">
            <Like />
          </div>
        </div>
        <p className="mb-2 w-full text-ellipsis text-lg font-bold text-black">
          {title.length < 20 ? title : title.slice(0, 19) + '...'}
        </p>
        <div className="mb-2 flex w-full flex-wrap justify-between text-sm">
          <span>
            {location.length > 1
              ? location[0] + ' 외 ' + (location.length - 1)
              : location[0]}
          </span>
          <span>
            {genre.length > 1
              ? genre[0] + ' 외 ' + (genre.length - 1)
              : genre[0]}
          </span>
          <span>
            {type.length > 1 ? type[0] + ' 외 ' + (type.length - 1) : type[0]}
          </span>
          <span>
            {time.length > 1 ? time[0] + ' 외 ' + (time.length - 1) : time[0]}
          </span>
        </div>
        <div>
          {review && <Review average={review.average} count={review.count} />}
        </div>
        <div className=" mt-auto flex w-full items-center justify-between">
          <p className="text-lg font-bold text-[#414141] text-black">
            {price}원
          </p>
          <div className="text-sm">
            <Profile src={profile?.src} nickname={profile.nickname} size={34} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
