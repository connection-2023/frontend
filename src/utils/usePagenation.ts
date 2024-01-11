import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { FetchError, PagenationFilterState } from '@/types/types';

interface usePageNationProps {
  defaultFilterState: PagenationFilterState; //기본 값
  itemList: any[]; // 아이템 state
  changeItemListFn: (data: any) => void; // 아이템 setState
  getItemListFn: (data: any, signal: AbortSignal) => any; // 아이템 받아오는 비동기 함수
  totalItemCount: number;
  firstPageIndex?: number;
}

const usePageNation = ({
  defaultFilterState,
  itemList,
  changeItemListFn,
  getItemListFn,
  totalItemCount: itemCount,
  firstPageIndex = 0,
}: usePageNationProps) => {
  const [totalItemCount, setTotalItemCount] = useState(itemCount);
  const [itemId, setItemId] = useState({
    firstItemId: itemList[0]?.id ?? 0,
    lastItemId: itemList[itemList.length - 1]?.id ?? 0,
  });
  const [filterState, setFilterState] =
    useState<PagenationFilterState>(defaultFilterState);
  const [reset, setReset] = useState(false);
  const initialFilterState = useRef(filterState);
  const controller = useRef<AbortController | null>(null);
  const prevPage = useRef<number | null>(null);

  useEffect(() => {
    setItemId({
      firstItemId: itemList[0]?.id ?? 0,
      lastItemId: itemList[itemList.length - 1]?.id ?? 0,
    });
  }, [itemList]);

  useEffect(() => {
    if (filterState !== initialFilterState.current) {
      handleGetList();
    }
  }, [filterState]);

  const handleGetList = async () => {
    if (controller.current) {
      controller.current.abort();
    }

    controller.current = new AbortController();

    const data = {
      ...filterState,
      ...itemId,
    };

    try {
      const { count, item } = await getItemListFn(
        data,
        controller.current.signal,
      );

      changeItemListFn(item);
      if (itemId.firstItemId === 0 && itemId.lastItemId === 0) {
        setTotalItemCount(count ?? 0);
      }
    } catch (error) {
      if (
        !(error instanceof DOMException && error.name === 'AbortError') &&
        error instanceof Error
      ) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            const { count, item } = await getItemListFn(
              data,
              controller.current.signal,
            );
            changeItemListFn(item);
            if (itemId.firstItemId === 0 && itemId.lastItemId === 0) {
              setTotalItemCount(count ?? 0);
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          console.error(error);
          toast.error('잘못된 요청입니다!');
        }
      }
    }

    prevPage.current = null;

    if (reset && firstPageIndex > 0) {
      filterState.currentPage = firstPageIndex;
      filterState.targetPage = firstPageIndex;

      setReset(false);
    }
  };

  const updateFilter = (key: string, value: any) => {
    setReset(true);

    setItemId({
      firstItemId: 0,
      lastItemId: 0,
    });

    setFilterState((prevState) => ({
      ...prevState,
      currentPage: 0,
      targetPage: 0,
      [key]: value,
    }));
  };

  const resetFilter = (key: string, value: any) => {
    setReset(true);

    setItemId({
      firstItemId: 0,
      lastItemId: 0,
    });

    setFilterState({
      ...defaultFilterState,
      currentPage: 0,
      targetPage: 0,
      [key]: value,
    });
  };

  const handleChangePage = ({ selected }: { selected: number }) => {
    if (prevPage.current === null) {
      prevPage.current = filterState.targetPage ?? 0;
    }

    setFilterState((prevState) => ({
      ...prevState,
      currentPage: prevPage.current ?? filterState.targetPage,
      targetPage: selected + firstPageIndex,
    }));
  };

  return {
    filterState,
    totalItemCount,
    handleChangePage,
    updateFilter,
    resetFilter,
  };
};

export default usePageNation;
