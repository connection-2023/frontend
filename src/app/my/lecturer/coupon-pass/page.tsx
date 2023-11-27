import { getMyLecture } from '@/lib/apis/serverApis/classApi';
import CouponPass from './_components/CouponPass';

const CouponPassPage = async () => {
  let myLectureListsOption;

  try {
    const resLectureLists = await getMyLecture();

    myLectureListsOption = resLectureLists.map(({ id, title }) => ({
      value: id,
      label: title,
    }));
  } catch (error) {
    console.error(error);
  }

  return <CouponPass myLectureList={myLectureListsOption ?? []} />;
};

export default CouponPassPage;
