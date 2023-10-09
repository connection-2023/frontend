const SearchResults = () => {
  const test = 1;

  return (
    <>
      <h2 className="mb-4 mt-7 text-lg font-semibold">{`검색 결과 (${test})`}</h2>
      <address className="flex flex-col gap-1 text-sm font-semibold">
        <div className="text-sub-color1">04300</div>
        <h3>서울 특별시 어쩌구 저쩌구</h3>
        <div className="text-[#969696]">[지번] 어쩌구 저꺼그</div>
      </address>
      <hr className="border-t-1 my-4 w-full border-solid border-sub-color2" />;
    </>
  );
};

export default SearchResults;
