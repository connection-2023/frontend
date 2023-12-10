import Rating from './Rating';

interface ReviewStatisticsProps {
  reviewList: {
    stars: number;
  }[];
}

const ReviewStatistics = ({ reviewList }: ReviewStatisticsProps) => {
  const totalReviews = reviewList.length;
  const totalScore = reviewList.reduce(
    (total, review) => total + review.stars,
    0,
  );
  const averageScore = totalScore / totalReviews;

  const scoreCount = Array(5).fill(0);
  reviewList.forEach((review) => scoreCount[review.stars - 1]++);

  const scorePercent = scoreCount.map((count) => (count / totalReviews) * 100);

  return (
    <dl className="flex w-full flex-col gap-2 p-5 shadow-vertical">
      <dt className="text-2xl font-bold">
        {averageScore} <span className="text-gray-500">/ 5.0</span>
      </dt>
      <dd className="mb-4">
        <Rating
          rate={averageScore}
          readonly={true}
          viewRate={false}
          reviewCount={totalReviews}
        />
      </dd>
      {[5, 4, 3, 2, 1].map((score) => {
        const percent = `w-[${scorePercent[5 - score]}%]`;
        return (
          <dd
            key={score}
            className="flex items-center gap-3 text-sm font-semibold"
          >
            {score}
            <span className="relative h-2 flex-grow rounded-md bg-sub-color1-transparent">
              <span
                className={`${percent} absolute h-2 rounded-md bg-sub-color1`}
              />
            </span>
            <p className="font-medium text-gray-300">
              {scoreCount[5 - score]}개
            </p>
          </dd>
        );
      })}
    </dl>
  );
};

export default ReviewStatistics;
