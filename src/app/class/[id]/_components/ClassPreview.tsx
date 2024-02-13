import { cookies } from 'next/headers';
import Image from 'next/image';
import { CLASS_HSTYLE } from '@/constants/constants';
import {
  LocationSVG,
  TimeSVG,
  GroupSVG,
  LevelSVG,
  GenreSVG,
} from '@/icons/svg';
import { getClassPreview } from '@/lib/apis/serverApis/classPostApis';
import { getClassCouponList } from '@/lib/apis/serverApis/couponApis';
import {
  formatLocationToString,
  formatGenreToString,
} from '@/utils/parseUtils';
import DiscountCouponBanner from './DiscountCouponBanner';
import OptionButton from './OptionButton';
import Carousel from '@/components/Carousel/Carousel';
import Review from '@/components/Review/Review';

const ClassPreview = async ({ id }: { id: string }) => {
  const cookieStore = cookies();
  const user = cookieStore.get('userAccessToken')?.value;
  const classPreview = getClassPreview(id);
  const couponLists = getClassCouponList(id, !!user);

  const [classPreviewData, couponList] = await Promise.all([
    classPreview,
    couponLists,
  ]);

  const {
    lecturerId,
    title,
    lectureImage,
    stars,
    isGroup,
    difficultyLevel,
    maxCapacity,
    duration,
    lectureToRegion,
    isLike,
    lectureToDanceGenre,
    price,
  } = classPreviewData;

  return (
    <section className="mb-4 flex w-full flex-col items-center border-b border-solid border-gray-500 md:col-span-2 xl:col-span-3">
      {/* 클래스 이미지 */}
      <div className="mb-5 flex h-[18rem] w-full justify-center px-10">
        {lectureImage.length > 2 ? (
          <div className="relative h-full w-full overflow-hidden">
            <div className="h-full w-1/3">
              <Carousel
                imgURL={lectureImage.map((image) => image.imageUrl)}
                move={true}
                priority={3}
                showCurrentElementBackGround={false}
              />
            </div>
          </div>
        ) : (
          lectureImage.map((img, index) => (
            <div key={img.imageUrl + index} className="relative h-full w-1/3">
              <Image
                src={img.imageUrl}
                alt="Connection 댄스 춤 이미지"
                fill
                sizes="(max-width: 720px) 60vw, (max-width: 1440px) 30vw"
              />
            </div>
          ))
        )}
      </div>

      <div className="relative flex w-full max-w-[40rem] px-4 text-lg font-bold md:justify-center">
        <h1 className="w-11/12 md:text-center">{title}</h1>
        <div className="absolute right-4 flex flex-col-reverse items-center gap-2 md:right-0 md:flex-row">
          <OptionButton
            lecturerId={lecturerId}
            title={title}
            postId={id}
            isLike={isLike}
          />
        </div>
      </div>

      {/* Review */}
      <div className="mb-4 mt-2 flex w-full max-w-[40rem] gap-1 px-4 md:justify-center">
        <Review average={stars} />
        <span className="text-sm font-bold text-gray-500">({stars})</span>
      </div>

      {/* 쿠폰 배너 */}
      {couponList && (
        <div className="w-full max-w-[40rem] border-b border-solid border-gray-700 px-4 pb-3">
          <DiscountCouponBanner couponList={couponList} price={price} />
        </div>
      )}

      <hr className="mb-4 h-1 w-full max-w-[40rem] md:mb-6" />
      {/* Class Info */}
      <ul className="mb-4 grid w-full max-w-[40rem] grid-cols-2 gap-y-3.5 px-4 md:mb-7 md:flex md:flex-wrap md:justify-items-center md:gap-x-10 md:whitespace-nowrap">
        <li className={CLASS_HSTYLE.h3}>
          <LocationSVG width={21} height={21} className="fill-sub-color1" />
          <span className="w-fit break-keep">
            {formatLocationToString(lectureToRegion)}
          </span>
        </li>
        <li className={CLASS_HSTYLE.h3}>
          <GenreSVG />
          <span className="w-fit break-keep">
            {formatGenreToString(lectureToDanceGenre)}
          </span>
        </li>

        <li className={CLASS_HSTYLE.h3}>
          <TimeSVG /> {duration}분
        </li>
        <li className={CLASS_HSTYLE.h3}>
          <GroupSVG />
          {isGroup ? `그룹레슨 (${maxCapacity}인)` : '개인레슨'}
        </li>
        <li className={CLASS_HSTYLE.h3}>
          <LevelSVG /> {difficultyLevel}
        </li>
      </ul>
    </section>
  );
};

export default ClassPreview;
