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

  let resReview: GetMyLecturersReviewsData = { review: [] };

  try {
    const [responseReviews, resLectureLists] = await Promise.all([
      getMyLecturersReviews(firstRender),
      getMyLecture(),
    ]);
    if (Array.isArray(responseReviews.review)) {
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
      reviewList={resReview.review}
      myClassListsOption={myClassListsOption ?? []}
    />
  );
};

export default page;
