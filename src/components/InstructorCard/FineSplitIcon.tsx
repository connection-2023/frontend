const FineSplitIcon = ({ activated }: { activated: boolean }) => {
  const splitDivs = Array(4)
    .fill('')
    .map((_, index) => (
      <div
        key={index}
        className={`rounded-sm ${activated ? 'bg-[#414141]' : 'bg-gray-700'}`}
      />
    ));

  return (
    <div className="grid h-[1.375rem] w-[1.4375rem] grid-cols-2 grid-rows-2 gap-x-[0.11rem] gap-y-[0.11rem]">
      {splitDivs}
    </div>
  );
};

export default FineSplitIcon;
