import { getMyLecture } from '@/lib/apis/serverApis/classApi';
import { getMyLecturersReviews } from '@/lib/apis/serverApis/reviewApis';
import MyReview from './_components/MyReview';
import { OptionType } from '@/types/coupon';
import { GetMyLecturersReviewsData } from '@/types/review';

const page = async () => {
  let myClassListsOption;
  const firstRender = {
    take: 10000,
    lecturerMyReviewType: '전체',
    orderBy: '최신순',
  };

  let resReview: GetMyLecturersReviewsData = { count: 0, item: [] };

  try {
    const [responseReviews, resLectureLists] = await Promise.all([
      getMyLecturersReviews(firstRender),
      getMyLecture(),
    ]);
    if (Array.isArray(responseReviews.item)) {
      resReview = responseReviews;
    }

    myClassListsOption = resLectureLists.map(
      ({ id, title }): OptionType => ({
        value: id,
        label: title,
      }),
    );

    myClassListsOption.length > 0 &&
      myClassListsOption.unshift({
        value: '',
        label: `전체 클래스(${myClassListsOption.length})`,
      });
  } catch (error) {
    console.error(error);
  }

  return (
    <MyReview
      reviewList={resReview.item}
      myClassListsOption={myClassListsOption ?? []}
    />
  );
};

export default page;
