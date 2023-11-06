import FullCalendar from './_components/FullCalendar';

const progrss = [
  {
    text: '수업 완료',
    count: 8,
    color: 'text-main-color',
  },
  {
    text: '수업 예정',
    count: 8,
    color: 'text-sub-color1',
  },
  {
    text: '총 수업',
    count: 8,
    color: '',
  },
];

const SchedulePage = () => {
  return (
    <section className="col-span-2 flex w-full flex-col gap-4">
      <div className="col-span-2 rounded-lg bg-white px-5 shadow-float">
        <FullCalendar />
      </div>
      <div className="mx-auto flex h-[4.25rem] w-full max-w-[60.67rem] items-center justify-between whitespace-nowrap rounded-lg bg-white px-5 text-gray-100 shadow-float">
        <h1 className="mr-12 text-lg font-bold">이번달 진행 현황</h1>
        <ul className="flex w-full list-outside list-disc gap-11 text-base font-semibold">
          {progrss.map((item, i) => (
            <ListItem text={item.text} count={item.count} color={item.color} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SchedulePage;

interface IListItem {
  text: string;
  count: number;
  color?: string;
}

const ListItem = ({ text, count, color }: IListItem) => (
  <li className={color}>
    {text}
    <span className="ml-2 text-gray-100">{count}회</span>
  </li>
);
