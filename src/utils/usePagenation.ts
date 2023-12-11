import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { FetchError, PagenationFilterState } from '@/types/types';

interface usePageNationProps {
  defaultFilterState: PagenationFilterState; //기본 값
  itemList: any[]; // 아이템 state
  changeItemListFn: (data: any) => void; // 아이템 setState
  getItemListFn: (data: any, signal: AbortSignal) => any; // 아이템 받아오는 비동기 함수
  pageIndex?: number;
}

const usePageNation = ({
  defaultFilterState,
  itemList,
  changeItemListFn,
  getItemListFn,
  pageIndex = 0,
}: usePageNationProps) => {
  const [totalItemCount, setTotalItemCount] = useState(itemList.length);
  const [itemId, setItemId] = useState({
    firstItemId: itemList[0]?.id ?? 0,
    lastItemId: itemList[itemList.length - 1]?.id ?? 0,
  });
  const [filterState, setFilterState] =
    useState<PagenationFilterState>(defaultFilterState);
  const initialFilterState = useRef(filterState);
  const controller = useRef<AbortController | null>(null);
  const prevPage = useRef<number | null>(null);

  useEffect(() => {
    setItemId({
      firstItemId: itemList[0]?.id ?? 0,
      lastItemId: itemList[itemList.length - 1]?.id ?? 0,
    });

    setTotalItemCount(itemList.length);
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

    console.log(data);

    try {
      const responseItem = await getItemListFn(data, controller.current.signal);
      changeItemListFn(responseItem);
    } catch (error) {
      if (
        !(error instanceof DOMException && error.name === 'AbortError') &&
        error instanceof Error
      ) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            const responseItem = await getItemListFn(
              data,
              controller.current.signal,
            );
            changeItemListFn(responseItem);
          } catch (error) {
            console.error(error);
          }
        } else {
          toast.error('잘못된 요청입니다!');
        }
      }
    }

    prevPage.current = null;
  };

  const updateFilter = (key: string, value: any) => {
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
    setItemId({
      firstItemId: 0,
      lastItemId: 0,
    });

    setFilterState({
      ...defaultFilterState,
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
      targetPage: selected + pageIndex,
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
