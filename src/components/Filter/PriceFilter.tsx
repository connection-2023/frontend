import { useState, useEffect } from 'react';
import { Range, getTrackBackground } from 'react-range';
import FilterModal from './FilterModal';
import { IFilterOptions } from '@/types/types';

const MIN = 0;
const MAX = 1000000;
interface IPriceFilterProps {
  filterOption: number[];
  updateFilterOption: (label: string, option: IFilterOptions['price']) => void;
}

const PriceFilter = ({
  filterOption,
  updateFilterOption,
}: IPriceFilterProps) => {
  const [values, setValues] = useState([MIN, MAX]);
  const [draggingThumbIndex, setDraggingThumbIndex] = useState<number | null>(
    null,
  );
  const label = '가격';
  useEffect(() => {
    if (filterOption.length === 2) {
      setValues(filterOption);
    } else {
      setValues([MIN, MAX]);
    }
  }, [filterOption]);

  const onReset = () => {
    setValues([MIN, MAX]);
    updateFilterOption(label, []);
  };

  const onApply = () => {
    updateFilterOption(label, values);
  };

  return (
    <FilterModal label={label} onReset={onReset} onApply={onApply}>
      <div className="flex flex-col px-[0.87rem]">
        <div className="mb-[0.75rem] mt-[1.25rem]">
          <Range
            draggableTrack
            step={1000}
            min={MIN}
            max={MAX}
            values={values}
            onChange={(values) => setValues(values)}
            onFinalChange={() => setDraggingThumbIndex(null)}
            renderTrack={({ props, children }) => (
              <div {...props} className="h-1 max-w-[13rem]">
                <div
                  ref={props.ref}
                  style={{
                    height: '100%',
                    width: '100%',
                    background: getTrackBackground({
                      values,
                      colors: [
                        'var(--sub-color4)',
                        'var(--sub-color1)',
                        'var(--sub-color4)',
                      ],
                      min: MIN,
                      max: MAX,
                    }),
                  }}
                />
                {children}
              </div>
            )}
            renderThumb={({ props, index }) => (
              <div
                {...props}
                onMouseDown={() => setDraggingThumbIndex(index)}
                onTouchStart={() => setDraggingThumbIndex(index)}
                onBlur={() => setDraggingThumbIndex(null)}
                className="relative h-5 w-5 rounded-full bg-white drop-shadow-[0_0_3px_rgba(0,0,0,0.50)] focus:outline-none"
              >
                {draggingThumbIndex === index && (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full transform whitespace-nowrap bg-sub-color1 px-1 text-xs text-white">
                    {values[index]}
                  </span>
                )}
              </div>
            )}
          />
        </div>
        <div className="mb-[0.5rem] flex items-center gap-[0.5rem]">
          <div className="flexflex-col border-sub-color4 box-border rounded-md border border-solid px-[0.44rem] py-[0.31rem] text-sm font-bold text-sub-color3">
            <span className="text-[0.625rem]">최저</span>
            <div className="flex">
              <label>₩</label>
              <input
                type="number"
                min={MIN}
                max={MAX}
                value={values[0]}
                onChange={(e) => setValues([Number(e.target.value), values[1]])}
                className="focus:outline-none"
              />
            </div>
          </div>
          -
          <div className="border-sub-color4 box-border flex flex-col rounded-md border border-solid px-[0.44rem] py-[0.31rem] text-sm font-bold text-sub-color3">
            <span className="text-[0.625rem]">최고</span>
            <div className="flex">
              <label>₩</label>
              <input
                type="number"
                min={MIN}
                max={MAX}
                value={values[1]}
                onChange={(e) => setValues([values[0], Number(e.target.value)])}
                className="focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </FilterModal>
  );
};

export default PriceFilter;
