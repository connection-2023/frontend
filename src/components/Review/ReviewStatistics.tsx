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
    <dl className="flex w-full flex-col gap-2 rounded-md bg-white p-5 shadow-vertical">
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
        const percent = parseFloat(scorePercent[score - 1].toFixed(2));

        return (
          <dd
            key={score}
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <p className="w-2">{score}</p>
            <span className="relative h-2 flex-grow rounded-md bg-sub-color1-transparent">
              <span
                className="absolute h-2 rounded-md bg-sub-color1"
                style={{ width: `${percent}%` }}
              />
            </span>
            <p className="w-3 whitespace-nowrap font-medium text-gray-300">
              {scoreCount[score - 1]}개
            </p>
          </dd>
        );
      })}
    </dl>
  );
};

export default ReviewStatistics;
