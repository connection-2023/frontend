const LargeSplitIcon = ({ activated }: { activated: boolean }) => {
  const splitDivs = Array(2)
    .fill('')
    .map((_, index) => (
      <div
        key={index}
        className={`rounded-sm ${activated ? 'bg-[#414141]' : 'bg-gray-700'}`}
      />
    ));

  return (
    <div className="grid h-[1.375rem] w-[1.4375rem] grid-rows-2 gap-y-[0.15rem]">
      {splitDivs}
    </div>
  );
};

export default LargeSplitIcon;
