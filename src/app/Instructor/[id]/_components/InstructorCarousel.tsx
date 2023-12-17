import Image from 'next/image';
import Carousel from '@/components/Carousel/Carousel';

const InstructorCarousel = ({ imgURL }: { imgURL: string[] }) => {
  return (
    <div className="mb-5 flex h-[12rem] w-full justify-center overflow-hidden px-5 sm:h-[18rem]">
      {imgURL.length > 2 ? (
        <div className="relative">
          <div className="h-full w-[56.625rem] overflow-hidden sm:w-[84rem]">
            <div className="h-full w-[18.875rem] min-w-0 sm:w-[28rem]">
              <Carousel
                imgURL={imgURL}
                move={true}
                priority={3}
                showCurrentElementBackGround={false}
                gap={0.2}
              />
            </div>
          </div>
        </div>
      ) : (
        imgURL.map((imgURL) => (
          <div
            key={imgURL}
            className="relative h-full w-[18.875rem] sm:w-[28rem]"
          >
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
  );
};

export default InstructorCarousel;
