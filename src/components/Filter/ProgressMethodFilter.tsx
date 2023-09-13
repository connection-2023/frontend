import React from 'react';
import { PROGRESS_METHOD } from '@/constants/constants';
const ProgressMethodFilter = () => {
  return (
    <ul className="flex w-[16.2rem] flex-wrap pb-1 pt-3">
      {PROGRESS_METHOD.map((method) => (
        <li key={method} className="mb-2 basis-1/2">
          <label className="flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="ml-3 mr-1 h-[1.12rem] w-[1.12rem] accent-sub-color1"
            />
            {method}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default ProgressMethodFilter;
