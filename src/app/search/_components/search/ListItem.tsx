const ListItem = ({ label }: { label: string }) => {
  return (
    <li className="mb-1 h-[38px] cursor-pointer whitespace-nowrap rounded-[3.125rem] bg-gray-900 px-[1.06rem] py-[0.44rem] text-base text-black">
      {label}
    </li>
  );
};

export default ListItem;
