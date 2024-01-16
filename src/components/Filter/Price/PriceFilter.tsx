import { Range, getTrackBackground } from 'react-range';
import { PRICE_FILTER_MAX, PRICE_FILTER_MIN } from '@/constants/constants';

interface PriceFilterProps {
  values: number[];
  draggingThumbIndex: number | null;
  onChangeValue: (values: number[]) => void;
  onChangeDraggingThumbIndex: (index: number | null) => void;
}

const PriceFilter = ({
  values,
  draggingThumbIndex,
  onChangeValue,
  onChangeDraggingThumbIndex,
}: PriceFilterProps) => {
  return (
    <div className="flex flex-col px-[0.87rem]">
      <div className="mb-[0.75rem] mt-[1.25rem]">
        <Range
          draggableTrack
          step={1000}
          min={PRICE_FILTER_MIN}
          max={PRICE_FILTER_MAX}
          values={values}
          onChange={(values) => onChangeValue(values)}
          onFinalChange={() => onChangeDraggingThumbIndex(null)}
          renderTrack={({ props, children }) => {
            return (
              <div {...props} className="h-1">
                <div
                  ref={props.ref}
                  style={{
                    height: '100%',
                    width: '100%',
                    background: getTrackBackground({
                      values,
                      colors: [
                        'var(--gray4)',
                        'var(--sub-color1)',
                        'var(--gray4)',
                      ],
                      min: PRICE_FILTER_MIN,
                      max: PRICE_FILTER_MAX,
                    }),
                  }}
                />
                {children}
              </div>
            );
          }}
          renderThumb={({ props, index }) => {
            const { key, ...rest } = props;
            return (
              <div
                key={key}
                {...rest}
                onMouseDown={() => onChangeDraggingThumbIndex(index)}
                onTouchStart={() => onChangeDraggingThumbIndex(index)}
                onBlur={() => onChangeDraggingThumbIndex(null)}
                className="relative top-0 h-5 w-5 rounded-full bg-white drop-shadow-[0_0_3px_rgba(0,0,0,0.50)] focus:outline-none"
              >
                {draggingThumbIndex === index && (
                  <span className="whitespace-nowrappx-1 absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full transform bg-sub-color1 text-xs text-white">
                    {values[index]}
                  </span>
                )}
              </div>
            );
          }}
        />
      </div>
      <div className="mb-[0.5rem] flex items-center gap-[0.5rem]">
        <div className="box-border flex w-1/2 flex-col rounded-md border border-solid border-gray-700 px-[0.44rem] py-[0.31rem] text-sm font-bold text-gray-100 sm:w-auto">
          <span className="text-[0.625rem]">최저</span>
          <div className="flex">
            <label>₩</label>
            <input
              type="number"
              min={PRICE_FILTER_MIN}
              max={PRICE_FILTER_MAX}
              value={values[0]}
              onChange={(e) =>
                onChangeValue([Number(e.target.value), values[1]])
              }
              className="focus:outline-none"
            />
          </div>
        </div>
        -
        <div className="box-border flex w-1/2 flex-col rounded-md border border-solid border-gray-700 px-[0.44rem] py-[0.31rem] text-sm font-bold text-gray-100 sm:w-auto">
          <span className="text-[0.625rem]">최고</span>
          <div className="flex">
            <label>₩</label>
            <input
              type="number"
              min={PRICE_FILTER_MIN}
              max={PRICE_FILTER_MAX}
              value={values[1]}
              onChange={(e) =>
                onChangeValue([values[0], Number(e.target.value)])
              }
              className="focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
