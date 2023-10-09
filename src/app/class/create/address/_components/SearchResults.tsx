import { AddressData } from '@/types/address';
import { Fragment } from 'react';

const SearchResults = ({ addressData }: { addressData: AddressData }) => {
  const { common, juso } = addressData.results;
  const { totalCount } = common;

  return (
    <>
      <h2 className="mb-4 mt-7 text-lg font-semibold">{`검색 결과 (${totalCount})`}</h2>
      {juso.map((juso) => {
        return (
          <Fragment key={juso.roadAddr}>
            <address className="flex flex-col gap-1 text-sm font-semibold">
              <div className="text-sub-color1">{juso.zipNo}</div>
              <h3>{juso.roadAddr}</h3>
              <div className="text-[#969696]">[지번] {juso.jibunAddr}</div>
            </address>
            <hr className="border-t-1 my-4 w-full border-solid border-sub-color2" />
          </Fragment>
        );
      })}
    </>
  );
};

export default SearchResults;
