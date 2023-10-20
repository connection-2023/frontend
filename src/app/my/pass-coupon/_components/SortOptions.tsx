import useCouponStore from '@/store/my-coupon';

const SortOptions = () => {
  const { sortOption, changeSortOption } = useCouponStore();

  return (
    <nav className="my-4 flex gap-4">
      <button
        className={`${
          sortOption !== '최신순' && 'text-sub-color2'
        } hover:text-black`}
        onClick={() => changeSortOption('최신순')}
      >
        최신순
      </button>
      <button
        className={`${
          sortOption !== '기간 임박순' && 'text-sub-color2'
        } hover:text-black`}
        onClick={() => changeSortOption('기간 임박순')}
      >
        기간 임박순
      </button>
    </nav>
  );
};

export default SortOptions;
