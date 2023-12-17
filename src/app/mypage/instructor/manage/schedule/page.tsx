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
    <section className="flex w-full flex-col gap-4 md:px-9 xl:px-0">
      <div className="hidden w-full rounded-lg bg-white px-5 shadow-float md:block">
        <FullCalendar />
      </div>

      <div className="mx-4 flex flex-col gap-y-2.5 whitespace-nowrap rounded-lg bg-white p-4 text-gray-100 shadow-float md:mx-auto md:w-full md:flex-row md:items-center md:px-0 md:px-5 md:py-6">
        <h1 className="mr-12 text-lg font-bold">이번달 진행 현황</h1>

        <ul
          role="list"
          className="flex list-inside list-disc gap-4 text-base font-semibold marker:mr-1 md:list-outside md:gap-11"
        >
          {progrss.map((item, i) => (
            <ListItem
              key={i}
              text={item.text}
              count={item.count}
              color={item.color}
            />
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
    <span className="relative -left-3 md:static"> {text}</span>
    <span className="-ml-1 text-gray-100 md:ml-2">{count}회</span>
  </li>
);
