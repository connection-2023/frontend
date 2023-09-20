import Image from 'next/image';
import Carousel from '@/components/Carousel/Carousel';
import Review from '@/components/Review/Review';
import Like from '@/components/Like/Like';
import Nav from '@/components/Nav/Nav';
import { dummyInstructor } from '@/constants/dummy';
import { INSTRUCTOR_SECTIONS } from '@/constants/constants';

const InstructorDetailPage = () => {
  const {
    imgURL,
    nickname,
    teamAffiliation,
    genre,
    location,
    like,
    review,
    instagramID,
    youtubeURL,
    anyURL,
  } = dummyInstructor;
  return (
    <main className="flex w-screen flex-col items-center">
      <section className="flex w-full max-w-[1440px] flex-col items-center ">
        {/* 강사 이미지 */}
        <div className="mb-5 flex h-[18rem] w-full justify-center px-10">
          {imgURL.length > 2 ? (
            <div className="relative h-full w-full overflow-hidden">
              <div className="h-full w-1/3">
                <Carousel
                  imgURL={imgURL}
                  move={true}
                  priority={3}
                  showCurrentElementBackGround={false}
                />
              </div>
            </div>
          ) : (
            imgURL.map((imgURL) => (
              <div key={imgURL} className="relative h-full w-1/3">
                <Image
                  src={imgURL}
                  alt="Connection 댄스 춤 이미지"
                  fill
                  sizes="(max-width: 720px) 60vw, (max-width: 1440px) 30vw"
                />
              </div>
            ))
          )}
        </div>

        {/* title */}
        <div className="flex flex-col items-center">
          {/* Name */}
          <div className=" relative flex w-full min-w-[23rem] items-center justify-center ">
            <h1 className="box-border flex items-center gap-1 pl-6 text-lg font-bold">
              {nickname}
              <Like />
            </h1>
            <div className="absolute right-0">신차</div>{' '}
            {/* 클라이언트 컴포넌트로 */}
          </div>

          {/* Review */}
          <div className="mb-6 mt-2 box-border flex gap-1 pl-4">
            <Review average={review.average} />
            <span className="text-sm font-bold text-sub-color2">
              ({review.average})
            </span>
          </div>

          <dl className="inline-grid min-w-[31rem] grid-cols-2 gap-2 whitespace-nowrap border-t-2 border-solid border-[#D9D9D9] py-5">
            <div className="flex gap-3">
              <dt className="text-sub-color1">지역</dt>
              <dd>{location}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-sub-color1">인스타</dt>
              <dd>{instagramID}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-sub-color1">장르</dt>
              <dd>{genre.join(', ')}</dd>
            </div>
            <a href={youtubeURL} target="_blank" className="flex gap-3">
              <dt className="text-sub-color1">유튜브</dt>
              <dd>{youtubeURL}</dd>
            </a>
            <div className="flex gap-3">
              <dt className="text-sub-color1">소속</dt>
              <dd>{teamAffiliation.join(', ')}</dd>
            </div>
            <a href={anyURL} className="flex gap-3" target="_blank">
              <dt className="text-sub-color1">뭔데이거</dt>
              <dd>{anyURL}</dd>
            </a>
          </dl>
        </div>
      </section>

      <hr className="mb-2 h-[1px] w-screen bg-[#D9D9D9] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)]" />

      <div className="w-1/2 min-w-[23rem] max-w-5xl">
        <Nav sections={INSTRUCTOR_SECTIONS} />
      </div>

      <section className=""></section>
    </main>
  );
};

export default InstructorDetailPage;

{
  /* <div className="relative flex w-full  min-w-[23rem]  items-center justify-center">
<h1 className="relative text-lg font-bold">
  {nickname}
  <div className="absolute -right-8 -top-[0.1rem]">
    <Like />
  </div>
</h1>
<div className="absolute right-0">신차</div>
</div> */
}
