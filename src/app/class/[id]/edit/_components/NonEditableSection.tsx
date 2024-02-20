import { CLASS_EDIT_STYLE } from '@/constants/constants';
import {
  LocationSVG,
  TimeSVG,
  GroupSVG,
  LevelSVG,
  GenreSVG,
} from '@/icons/svg';
import {
  formatLocationToString,
  formatGenreToString,
} from '@/utils/parseUtils';
import { IClassEditPageData } from '@/types/class';

const NonEditableSection = (props: IClassEditPageData) => {
  const {
    title,
    lectureToRegion,
    lectureToDanceGenre,
    duration,
    isGroup,
    maxCapacity,
    difficultyLevel,
  } = props;

  return (
    <>
      <h1 className="relative flex w-full max-w-[40rem] px-4 text-lg font-bold md:justify-center">
        <p className="w-11/12 md:text-center">{title}</p>
      </h1>

      <hr className="mb-4 h-1 w-full max-w-[40rem] md:mb-6" />

      <div className="mb-4 grid w-full max-w-[40rem] grid-cols-2 gap-y-3.5 px-4 md:mb-7 md:flex md:flex-wrap md:justify-items-center md:gap-x-10 md:whitespace-nowrap">
        <h3 className={CLASS_EDIT_STYLE.h3}>
          <LocationSVG width={21} height={21} className="fill-sub-color1" />
          <span className="w-fit break-keep">
            {formatLocationToString(lectureToRegion)}
          </span>
        </h3>
        <h3 className={CLASS_EDIT_STYLE.h3}>
          <GenreSVG />
          <span className="w-fit break-keep">
            {formatGenreToString(lectureToDanceGenre)}
          </span>
        </h3>

        <h3 className={CLASS_EDIT_STYLE.h3}>
          <TimeSVG /> {duration}분
        </h3>
        <h3 className={CLASS_EDIT_STYLE.h3}>
          <GroupSVG />
          {isGroup ? `그룹레슨 (${maxCapacity}인)` : '개인레슨'}
        </h3>
        <h3 className={CLASS_EDIT_STYLE.h3}>
          <LevelSVG /> {difficultyLevel}
        </h3>
      </div>
    </>
  );
};

export default NonEditableSection;
