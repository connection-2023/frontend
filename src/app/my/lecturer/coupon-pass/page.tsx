import { getMyLecture } from '@/lib/apis/serverApis/classApi';
import CouponPass from './_components/CouponPass';
import { OptionType } from '@/types/coupon';

const CouponPassPage = async () => {
  let myLectureListsOption;

  try {
    const resLectureLists = await getMyLecture();

    myLectureListsOption = resLectureLists.map(
      ({ id, title }): OptionType => ({
        value: id,
        label: title,
      }),
    );

    myLectureListsOption.length > 0 &&
      myLectureListsOption.unshift({
        value: 'select-all',
        label: `전체 클래스(${myLectureListsOption.length})`,
      });
  } catch (error) {
    console.error(error);
  }

  return <CouponPass myLectureList={myLectureListsOption ?? []} />;
};

export default CouponPassPage;
