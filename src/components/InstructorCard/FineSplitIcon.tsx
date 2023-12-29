const FineSplitIcon = ({
  activated,
  imgStateHandler,
}: {
  activated: boolean;
  imgStateHandler: (state: boolean) => void;
}) => {
  const splitDivs = Array(4)
    .fill('')
    .map((_, index) => (
      <div
        key={index}
        className={`rounded-sm ${activated ? 'bg-[#414141]' : 'bg-gray-700'}`}
      />
    ));

  return (
    <button onClick={() => imgStateHandler(false)}>
      <div className="grid h-[1.375rem] w-[1.4375rem] grid-cols-2 grid-rows-2 gap-x-[0.11rem] gap-y-[0.11rem]">
        {splitDivs}
      </div>
    </button>
  );
};

export default FineSplitIcon;
