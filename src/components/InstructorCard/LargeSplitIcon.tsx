const LargeSplitIcon = ({
  activated,
  imgStateHandler,
}: {
  activated: boolean;
  imgStateHandler: (state: boolean) => void;
}) => {
  const splitDivs = Array(2)
    .fill('')
    .map((_, index) => (
      <div
        key={index}
        className={`rounded-sm ${activated ? 'bg-[#414141]' : 'bg-gray-700'}`}
      />
    ));

  return (
    <button onClick={() => imgStateHandler(true)}>
      <div className="grid h-[1.375rem] w-[1.4375rem] grid-rows-2 gap-y-[0.15rem]">
        {splitDivs}
      </div>
    </button>
  );
};

export default LargeSplitIcon;
