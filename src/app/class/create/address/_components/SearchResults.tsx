import { Fragment } from 'react';
import { AddressData, Juso } from '@/types/address';

const SearchResults = ({ addressData }: { addressData: AddressData }) => {
  const { common, juso } = addressData.results;
  const { totalCount, errorCode, errorMessage } = common;

  const postAddress = (juso: Juso) => {
    window.opener.postMessage(juso, window.origin);
    window.close();
  };

  if (errorCode !== '0') {
    return <div className="mt-2 text-main-color">{errorMessage}</div>;
  }

  return (
    <>
      <h2 className="mb-4 mt-7 text-lg font-semibold">{`검색 결과 (${totalCount})`}</h2>
      {juso.map((juso) => (
        <Fragment key={juso.roadAddr}>
          <address
            className="flex cursor-pointer flex-col gap-1 text-sm font-semibold"
            onClick={() => postAddress(juso)}
          >
            <div className="text-sub-color1">{juso.zipNo}</div>
            <h3>{juso.roadAddr}</h3>
            <div className="text-[#969696]">[지번] {juso.jibunAddr}</div>
          </address>
          <hr className="border-t-1 my-4 w-full border-solid border-sub-color2" />
        </Fragment>
      ))}
    </>
  );
};

export default SearchResults;
