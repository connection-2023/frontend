import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useWindowSize } from 'react-use';
import { LECTURE_COUPON_TAKE } from '@/constants/constants';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import {
  IFilterState,
  IgetListFunctionHandler,
  IonChangeItemList,
} from '@/types/coupon';
import { FetchError } from '@/types/types';

interface useCouponPassHookProps {
  myLectureList: {
    value: string | number;
    label: string;
  }[];
  defaultItemCount: number;
  itemList: any[];
  onChange: ({ itemList, prevPage, type }: IonChangeItemList) => void;
  getFunction: ({ type, data, signal }: IgetListFunctionHandler) => Promise<{
    totalItemCount: number;
    itemList: any[];
  }>;
  type: 'user' | 'lecturer';
}

const useCouponPassHook = ({
  myLectureList,
  itemList,
  defaultItemCount,
  onChange,
  getFunction,
  type,
}: useCouponPassHookProps) => {
  const [totalItemCount, setTotalItemCount] = useState(defaultItemCount);
  const [itemId, setItemId] = useState({
    firstItemId: itemList[0]?.id ?? 0,
    lastItemId: itemList[itemList.length - 1]?.id ?? 0,
  });
  const [filterState, setFilterState] = useState<IFilterState>({
    isInterested: 'COUPON',
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
    onChange({ itemList, type: filterState.isInterested });

    setItemId({
      firstItemId: itemList[0]?.id ?? 0,
      lastItemId: itemList[itemList.length - 1]?.id ?? 0,
    });

    setTotalItemCount(defaultItemCount);

    setFilterState(initialFilterState.current);
  }, [itemList]);

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
    if (filterState.isInterested === 'COUPON') {
      try {
        const { selectedClass } = filterState;

        const data = {
          take: LECTURE_COUPON_TAKE,
          currentPage: filterState.currentPage,
          targetPage: filterState.targetPage,
          firstItemId: itemId.firstItemId,
          lastItemId: itemId.lastItemId,
          couponStatusOption: filterState.passStatusOptions, //s 빼야합니다. 나중에
          filterOption: filterState.filterOption,
          [type === 'user' ? 'lectureIds' : 'lectureId']:
            selectedClass?.value === 'select-all'
              ? undefined
              : selectedClass?.value,
        };

        const resData = await getFunction({
          data,
          signal: controller.current.signal,
          type: filterState.isInterested,
        });

        onChange({
          itemList: resData.itemList ?? [],
          prevPage: width < 640 ? prevPage.current !== null : false,
          type: filterState.isInterested,
        });

        setItemId({
          firstItemId:
            resData.itemList && resData.itemList.length > 0
              ? resData.itemList[0].id
              : 0,
          lastItemId:
            resData.itemList && resData.itemList.length > 0
              ? resData.itemList[resData.itemList.length - 1].id
              : 0,
        });

        setTotalItemCount(resData.totalItemCount);
      } catch (error) {
        if (error instanceof Error) {
          const fetchError = error as FetchError;
          if (fetchError.status === 401) {
            try {
              await accessTokenReissuance();
              setLoading(false);
              await handleGetList();
            } catch (error) {
              console.error(error);
            }
          } else {
            toast.error('잘못된 요청입니다!');
          }
        }
      }
    }

    prevPage.current = null;
    setLoading(false);
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

  const handleChangeOptions = async (
    id: 'AVAILABLE' | 'DISABLED' | 'USED' | 'EXPIRED',
  ) => {
    setItemId({
      firstItemId: 0,
      lastItemId: 0,
    });

    setFilterState((prevState) => ({
      ...prevState,
      passStatusOptions: id,
      selectedClass:
        myLectureList.length > 0
          ? {
              value: 'select-all',
              label: `전체 클래스(${myLectureList.length - 1})`,
            }
          : null,
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

  return {
    filterState,
    handleChangeOptions,
    handleChangeSelectedClass,
    handleFilterOptionChange,
    lastItemElementRef,
    handleChangePage,
    loading,
    totalItemCount,
    width,
  };
};

export default useCouponPassHook;
