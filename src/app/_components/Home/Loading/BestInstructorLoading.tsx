import Carousel from '@/components/Carousel/Carousel';

const BestInstructorLoading = () => (
  <div className="relative px-4 sm:px-9 xl:px-16">
    <div className="h-[4.75rem] w-[4.75rem] lg:h-[9.375rem] lg:w-[9.25rem]">
      <div className="overflow-hidden">
        <ul className="h-[4.75rem] w-[4.75rem] lg:h-[9.375rem] lg:w-[9.25rem]">
          <Carousel
            move={true}
            priority={10}
            gap={1}
            showCurrentElement={false}
            movePause={true}
          >
            {Array.from({ length: 8 }, (_, index) => (
              <li
                key={index}
                className="h-full w-full animate-pulse rounded-md bg-gray-700"
              />
            ))}
          </Carousel>
        </ul>
      </div>
    </div>
  </div>
);

export default BestInstructorLoading;
