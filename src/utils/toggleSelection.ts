interface ToggleSelection {
  value: string;
  allList: string[];
  currentList: string[];
  selectAllName: string;
  isValueChecked: boolean;
}

export const toggleSelection = ({
  value,
  allList,
  currentList,
  selectAllName,
  isValueChecked,
}: ToggleSelection) => {
  let newList: string[];
  const isAlreadyIncluded = currentList.includes(value);

  if (value === selectAllName) {
    isValueChecked
      ? (newList = [...allList.filter((g) => g !== selectAllName)])
      : (newList = []);
  } else if (isValueChecked && !isAlreadyIncluded) {
    newList = [...currentList, value];
  } else if (!isValueChecked && isAlreadyIncluded) {
    newList = currentList.filter((g) => g !== value);
  } else {
    return currentList;
  }

  return newList;
};
