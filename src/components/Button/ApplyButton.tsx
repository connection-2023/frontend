interface ApplyButtonProps {
  label: React.ReactNode;
  onClick: () => void;
}

const ApplyButton = ({ label, onClick }: ApplyButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="group flex h-[45px] w-full items-center justify-center rounded-md bg-main-color text-xl font-bold text-white hover:bg-[#D34889] active:scale-105"
    >
      {label}
    </button>
  );
};

export default ApplyButton;
