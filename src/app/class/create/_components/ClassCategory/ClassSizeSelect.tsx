import { useEffect, useState } from 'react';
import Select from 'react-select';

const ClassSizeSelect = ({ lessonType }: { lessonType: string }) => {
  const allOptions = Array.from({ length: 101 }, (_, i) => ({
    value: i,
    label: String(i),
  }));

  const [minStudent, setMinStudent] = useState({
    select: allOptions[0],
    option: allOptions,
  });
  const [maxStudent, setMaxStudent] = useState({
    select: allOptions[allOptions.length - 1],
    option: allOptions,
  });

  useEffect(() => {
    const { value: minValue } = minStudent.select;
    const { value: maxValue } = maxStudent.select;

    setMinStudent({
      select: minStudent.select,
      option: allOptions.slice(0, maxValue + 1),
    });

    setMaxStudent({
      select: maxStudent.select,
      option: allOptions.slice(minValue),
    });
  }, [minStudent.select, maxStudent.select]);

  const studentCounts = [
    { title: '최소', state: minStudent, setState: setMinStudent },
    { title: '최대', state: maxStudent, setState: setMaxStudent },
  ];

  return (
    <>
      {studentCounts.map(({ title, state, setState }) => (
        <div key={title} className="flex items-center gap-2">
          <h3>{title}</h3>
          <Select
            defaultValue={state.select}
            onChange={(selected) =>
              setState({
                select:
                  selected ||
                  (title === '최소'
                    ? allOptions[0]
                    : allOptions[allOptions.length - 1]),
                option: state.option,
              })
            }
            options={state.option}
            styles={{
              menuList: (base) => ({ ...base, maxHeight: '200px' }),
            }}
          />
        </div>
      ))}
    </>
  );
};

export default ClassSizeSelect;
