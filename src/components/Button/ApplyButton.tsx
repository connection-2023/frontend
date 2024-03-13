interface ApplyButtonProps {
  label: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const ApplyButton = ({
  label,
  onClick,
  disabled = false,
}: ApplyButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group flex h-[45px] w-full items-center justify-center rounded-md text-xl font-bold text-white  active:scale-105 ${
        disabled
          ? 'bg-main-color-transparent'
          : 'bg-main-color hover:bg-[#D34889]'
      }`}
    >
      {label}
    </button>
  );
};

export default ApplyButton;
