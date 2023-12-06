interface CountButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const CountButton = ({ children, onClick }: CountButtonProps) => {
  return (
    <button
      className="h-[31px] w-[35px] border border-solid border-gray-500 bg-gray-900 text-gray-500 hover:text-black"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CountButton;
