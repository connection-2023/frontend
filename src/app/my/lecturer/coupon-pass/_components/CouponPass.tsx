'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import { LECTURE_COUPON_TAKE } from '@/constants/constants';
import { CouponSVG, NotFoundSVG } from '@/icons/svg';
import { getLecturerCoupons } from '@/lib/apis/couponApis';
import ClassFilterSelect from './ClassFilterSelect';
import CouponComponent from './CouponComponent';
import CouponCreateModal from './CouponCreateModal';
import Button from '@/components/Button/Button';
import Pagination from '@/components/Pagination/Pagination';
import { IFilterState, SelectClassType, couponGET } from '@/types/coupon';

interface CouponPassProps {
  myLectureList: SelectClassType[];
  totalItemCount: number;
  couponList: couponGET[];
}

const CouponPass = ({
  myLectureList,
  totalItemCount: defaultTotalItemCount,
  couponList,
}: CouponPassProps) => {
  const [couponLists, setCouponLists] = useState(couponList);
  const [selectCouponData, setSelectCouponData] = useState<
    couponGET | undefined
  >(undefined);
  const [couponModalOpened, setCouponModalOpened] = useState(false);
  const [modalType, setModalType] = useState<'CREATE' | 'UPDATE'>('CREATE');
  const [totalItemCount, setTotalItemCount] = useState(defaultTotalItemCount);
  const [itemId, setItemId] = useState({
    firstItemId: couponList[0]?.id ?? 0,
    lastItemId: couponList[couponList.length - 1]?.id ?? 0,
  });
  const [filterState, setFilterState] = useState<IFilterState>({
    isInterested: true,
    passStatusOptions: 'AVAILABLE',
    filterOption: 'LATEST',
    selectedClass:
      myLectureList.length > 0
        ? {
            value: 'select-all',
            label: `전체 클래스(${myLectureList.length - 1})`,
          }
        : null,
    currentPage: 1,
    targetPage: 1,
  });
  const initialFilterState = useRef(filterState);
  const prevPage = useRef<number | null>(null);

  const controller = useRef<AbortController | null>(null);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const { width } = useWindowSize();
  const [prevWidth, setPrevWidth] = useState(width);
  const router = useRouter();

  useEffect(() => {
    if (prevWidth < 640 && width >= 640) {
      router.refresh();
      setPrevWidth(width);
    } else if (prevWidth >= 640 && width < 640) {
      router.refresh();
      setPrevWidth(width);
    }
  }, [width, prevWidth]);

  useEffect(() => {
    setCouponLists(couponList);

    setItemId({
      firstItemId: couponList[0]?.id ?? 0,
      lastItemId: couponList[couponList.length - 1]?.id ?? 0,
    });

    setTotalItemCount(defaultTotalItemCount);

    setFilterState(initialFilterState.current);
  }, [couponList]);

  useEffect(() => {
    if (filterState !== initialFilterState.current) {
      handleGetList();
    }
    if (filterState.currentPage === 0 && filterState.targetPage === 0) {
      setFilterState((prevState) => ({
        ...prevState,
        currentPage: 1,
        targetPage: 1,
      }));
    }
  }, [filterState]);

  const handleGetList = async () => {
    if (filterState.currentPage === 1 && filterState.targetPage === 1) {
      return;
    }

    if (controller.current) {
      controller.current.abort();
    }

    controller.current = new AbortController();

    setLoading(true);
    if (filterState.isInterested) {
      const { selectedClass } = filterState;

      const data = {
        take: LECTURE_COUPON_TAKE,
        currentPage: filterState.currentPage,
        targetPage: filterState.targetPage,
        firstItemId: itemId.firstItemId,
        lastItemId: itemId.lastItemId,
        issuedCouponStatusOptions: filterState.passStatusOptions,
        filterOption: filterState.filterOption,
        lectureId:
          selectedClass?.value === 'select-all'
            ? undefined
            : selectedClass?.value,
      };

      const resData = await getLecturerCoupons(data, controller.current.signal);

      if (width < 640) {
        setCouponLists((couponList) => [
          ...couponList,
          ...(resData.couponList ? resData.couponList : []),
        ]);
      } else {
        setCouponLists(resData.couponList ?? []);
      }

      setItemId({
        firstItemId:
          resData.couponList && resData.couponList.length > 0
            ? resData.couponList[0].id
            : 0,
        lastItemId:
          resData.couponList && resData.couponList.length > 0
            ? resData.couponList[resData.couponList.length - 1].id
            : 0,
      });

      setTotalItemCount(resData.totalItemCount);
    }

    prevPage.current = null;
    setLoading(false);
  };

  const lastItemElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          handleChangePage({ selected: filterState.targetPage });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading],
  );

  const handleOpenCouponModal = (
    type: 'CREATE' | 'UPDATE',
    coupon?: couponGET,
  ) => {
    setModalType(type);
    setSelectCouponData(coupon);
    setCouponModalOpened(true);
  };

  const handleChangeOptions = async (id: 'AVAILABLE' | 'DISABLED') => {
    setItemId({
      firstItemId: 0,
      lastItemId: 0,
    });

    setFilterState((prevState) => ({
      ...prevState,
      passStatusOptions: id,
      currentPage: 0,
      targetPage: 0,
    }));
  };

  const handleChangeSelectedClass = (selectedOptions: any) => {
    setItemId({
      firstItemId: 0,
      lastItemId: 0,
    });

    setFilterState((prevState) => ({
      ...prevState,
      selectedClass: selectedOptions,
      currentPage: 0,
      targetPage: 0,
    }));
  };

  const handleInterestChange = (isInterested: boolean) => {
    setItemId({
      firstItemId: 0,
      lastItemId: 0,
    });

    setFilterState((prevState) => ({
      ...prevState,
      isInterested,
      filterOption: 'LATEST',
      passStatusOptions: 'AVAILABLE',
      currentPage: 0,
      targetPage: 0,
    }));
  };

  const handleFilterOptionChange = (
    filterOption: 'LATEST' | 'UPCOMING' | 'HIGHEST_PRICE' | 'BEST_SELLING',
  ) => {
    setItemId({
      firstItemId: 0,
      lastItemId: 0,
    });

    setFilterState((prevState) => ({
      ...prevState,
      filterOption,
      currentPage: 0,
      targetPage: 0,
    }));
  };

  const handleChangePage = (selectedPage: { selected: number }) => {
    if (prevPage.current === null) {
      prevPage.current = filterState.targetPage;
    }

    setFilterState((prevState) => ({
      ...prevState,
      currentPage: prevPage.current!,
      targetPage: selectedPage.selected + 1,
    }));
  };

  const options: { id: 'AVAILABLE' | 'DISABLED'; label: string }[] = [
    {
      id: 'AVAILABLE',
      label: filterState.isInterested ? '활성화 쿠폰' : '활성화된 패스권',
    },
    {
      id: 'DISABLED',
      label: filterState.isInterested ? '만료 쿠폰' : '비활성화된 패스권',
    },
  ];

  const sortOptions: {
    id: 'LATEST' | 'UPCOMING' | 'HIGHEST_PRICE' | 'BEST_SELLING';
    label: string;
  }[] = filterState.isInterested
    ? [
        { id: 'LATEST', label: '최신순' },
        { id: 'UPCOMING', label: '기간 임박순' },
      ]
    : [
        { id: 'LATEST', label: '최신순' },
        { id: 'HIGHEST_PRICE', label: '높은 가격순' },
        { id: 'BEST_SELLING', label: '판매순' },
      ];

  return (
    <section className="z-0 col-span-2 flex w-full flex-col bg-white px-2 pt-5 sm:px-5">
      <nav className="flex justify-between pb-2">
        <div className="flex items-center gap-2 sm:gap-6">
          <button
            className={`flex text-xl font-bold sm:text-2xl ${
              !filterState.isInterested && 'text-gray-500'
            }`}
            onClick={() => handleInterestChange(true)}
          >
            쿠폰({totalItemCount})
          </button>
          <button
            className={`text-xl font-bold sm:text-2xl ${
              filterState.isInterested && 'text-gray-500'
            }`}
            onClick={() => handleInterestChange(false)}
          >
            패스권
          </button>
        </div>
        <div className="w-[7.3rem]">
          <Button onClick={() => handleOpenCouponModal('CREATE')}>
            <CouponSVG className="mr-1 h-6 w-6 fill-sub-color1 group-active:fill-white" />
            쿠폰 생성
          </Button>
        </div>
      </nav>

      <nav className="flex flex-wrap items-center gap-2 border-y border-solid border-gray-500 py-5 sm:flex-nowrap">
        {options.map((option) => (
          <button key={option.id} className="flex items-center gap-1">
            <input
              id={option.id}
              type="checkbox"
              className="peer h-[18px] w-[18px] accent-black"
              checked={filterState.passStatusOptions === option.id}
              onChange={() => handleChangeOptions(option.id)}
            />
            <label
              htmlFor={option.id}
              className="cursor-pointer text-gray-500 peer-checked:text-black"
            >
              {option.label}
            </label>
          </button>
        ))}
        <div className="w-80">
          <ClassFilterSelect
            options={myLectureList}
            value={filterState.selectedClass}
            onChange={handleChangeSelectedClass}
          />
        </div>
      </nav>

      <nav className="flex gap-2.5 py-4">
        {sortOptions.map((option) => (
          <button
            key={option.id} //check
            className={`flex text-sm font-bold ${
              filterState.filterOption !== option.id && 'text-gray-500'
            }`}
            onClick={() => handleFilterOptionChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </nav>

      <div className="flex flex-wrap gap-4 pb-4">
        {filterState.isInterested ? (
          <CouponComponent
            couponList={couponLists}
            handleOpenCouponModal={handleOpenCouponModal}
            lastItemElementRef={lastItemElementRef}
            totalItemCount={totalItemCount}
          />
        ) : null}
      </div>
      {loading && <div className="block sm:hidden">로딩중입니다...</div>}

      {!!totalItemCount ? (
        <nav className="my-8 hidden sm:block">
          <Pagination
            pageCount={Math.ceil(totalItemCount / LECTURE_COUPON_TAKE)}
            currentPage={
              filterState.targetPage === 0 ? 0 : filterState.targetPage - 1
            }
            onPageChange={handleChangePage}
          />
        </nav>
      ) : (
        <div className="my-7 flex w-full flex-col items-center justify-center gap-8 text-lg font-semibold text-gray-100">
          <NotFoundSVG />
          <p>{`해당 ${
            filterState.isInterested ? '쿠폰' : '패스권'
          }이 없습니다!`}</p>
        </div>
      )}

      {couponModalOpened && (
        <CouponCreateModal
          isOpen={couponModalOpened}
          closeModal={() => setCouponModalOpened(false)}
          type={modalType}
          selectCouponData={selectCouponData}
        />
      )}
    </section>
  );
};

export default CouponPass;
