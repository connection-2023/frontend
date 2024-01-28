export const getDayoffClassNames = (
  isSelected: boolean,
  isDisabled: boolean,
) => {
  let classNames = 'h-10 w-1/2 rounded-md';

  if (isDisabled) {
    classNames += ' border border-solid border-gray-500 text-gray-500';
  }

  if (isSelected) {
    classNames += ' bg-sub-color1 text-white';
  } else if (isSelected && !isDisabled) {
    classNames += ' border border-solid border-gray-500 text-gray-100';
  } else {
    classNames += ' border border-solid border-gray-500';
  }

  return classNames;
};
