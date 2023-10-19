import Image from 'next/image';
import Carousel from '@/components/Carousel/Carousel';

const InstructorCarousel = ({ imgURL }: { imgURL: string[] }) => {
  return (
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
  );
};

export default InstructorCarousel;
