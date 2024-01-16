import { useEffect, useRef } from 'react';
import {
  CITY_CODE,
  WARD_CODE,
  WARD_LIST,
} from '@/constants/administrativeDistrict';
import {
  FILTER_TIME,
  PRICE_FILTER_MAX,
  PRICE_FILTER_MIN,
} from '@/constants/constants';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import { CloseSVG } from '@/icons/svg';
import { usefilterStore } from '@/store';
import Button from '../Button/Button';
import { Regions } from '@/types/instructor';
import { FilterKey } from '@/types/types';

interface MobileFullModalProps {
  handleClosed: () => void;
  filterComponents: JSX.Element[];
}

const FilterMobileModal = ({
  handleClosed,
  filterComponents,
}: MobileFullModalProps) => {
  const { executeAllResets, filterList, setIsfilterModalOpen } = usefilterStore(
    (state) => ({
      executeAllResets: state.executeAllResets,
      filterList: state.filterList,
      setIsfilterModalOpen: state.setIsfilterModalOpen,
    }),
  );
  const overlayRef = useRef(null);
  const { changeMultipleParams } = useChangeSearchParams();

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    handleClosed();
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const filterHandlers: {
    [K in FilterKey]: (
      value: any,
    ) => { name: string; value: string } | { name: string; value: string }[];
  } = {
    지역: (value: Regions) => {
      const regionsCode = Object.entries(value)
        .flatMap(([city, wards]) => {
          const cityCode = CITY_CODE[city];
          return (
            cityCode +
            '_' +
            (wards.length === WARD_LIST[city].length
              ? '1'
              : wards.map((ward) => WARD_CODE[cityCode][ward]).join('%'))
          );
        })
        .join(',');

      return { name: 'regions', value: regionsCode };
    },
    장르: (value) => ({ name: 'genre', value }),
    평점: (value) => ({ name: 'stars', value: value === 0 ? '' : value }),
    가격: (value) => {
      const [min, max] = value;
      return [
        { name: 'gtePrice', value: min === PRICE_FILTER_MIN ? '' : min },
        { name: 'ltePrice', value: max === PRICE_FILTER_MAX ? '' : max },
      ];
    },
    지정날짜: (value) => {
      const [fromValue, toValue] = value;
      return [
        { name: 'gteDate', value: fromValue ? fromValue : '' },
        { name: 'lteDate', value: toValue ? toValue : '' },
      ];
    },
    인원: (value) => ({
      name: 'group',
      value: value === '그룹레슨' ? '' : value,
    }),
    '진행 방식': (value) => ({
      name: 'method',
      value: value === '전체' ? '' : value,
    }),
    '요일/시간대': (value) => {
      const { time, week } = value;
      return [
        { name: 'days', value: week },
        {
          name: 'timeOfDay',
          value: time.map(
            (time: string) =>
              FILTER_TIME.find(({ label }) => label === time)!.value,
          ),
        },
      ];
    },
  };

  const applyFilterList = () => {
    const multipleParams: { name: string; value: string | string[] }[] = [];

    Object.entries(filterList).forEach(([key, value]) => {
      const handler = filterHandlers[key as FilterKey];
      if (!handler) {
        return;
      }

      const result = handler(value);
      if (Array.isArray(result)) {
        multipleParams.push(...result);
      } else {
        multipleParams.push(result);
      }
    });

    setIsfilterModalOpen(false);
    changeMultipleParams(multipleParams);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed bottom-0 left-0 right-0 top-0 z-modal"
    >
      <section className="flex h-screen w-screen flex-col overflow-y-auto bg-white">
        <header className="relative flex h-24 min-h-[6rem] items-center justify-center border-b border-solid border-gray-300">
          <h1 className="mt-4 text-xl font-semibold">필터</h1>
          <button className="absolute right-4" onClick={handleClosed}>
            <CloseSVG
              width="24"
              height="24"
              className="stroke-gray-500 stroke-2"
            />
          </button>
        </header>
        <div className="mb-24 flex flex-shrink-0 flex-col">
          {filterComponents.map((FilterComponent) => FilterComponent)}
        </div>
        <nav className="fixed bottom-0 flex h-24 w-full justify-center gap-3 bg-white px-3 pt-2">
          <Button onClick={executeAllResets} color="secondary" size="large">
            초기화
          </Button>
          <Button onClick={applyFilterList} color="primary" size="large">
            적용
          </Button>
        </nav>
      </section>
    </div>
  );
};

export default FilterMobileModal;
