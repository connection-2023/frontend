import { getMyLecture } from '@/lib/apis/serverApis/classApi';
import { getLecturerCoupons } from '@/lib/apis/serverApis/couponApis';
import CouponPass from './_components/CouponPass';
import { OptionType, couponGET } from '@/types/coupon';

const CouponPassPage = async () => {
  let myLectureListsOption;
  let totalItemCount = 0;
  let couponList: couponGET[] = [];

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

    const reqData = {
      take: 8, //추후 null로 변경
      firstItemId: 1,
      issuedCouponStatusOptions: 'AVAILABLE' as 'AVAILABLE',
      filterOption: 'LATEST' as 'LATEST',
    };

    const result = await getLecturerCoupons(reqData);
    if (result) {
      const { totalItemCount: resTotalItemCount, couponList: resCouponList } =
        result;
      totalItemCount = resTotalItemCount;
      couponList = resCouponList;
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <CouponPass
      myLectureList={myLectureListsOption ?? []}
      couponList={couponList}
      totalItemCount={totalItemCount}
    />
  );
};

export default CouponPassPage;
