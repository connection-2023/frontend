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
    <main className="flex ">
      <aside className="h-[50rem] w-[5rem] bg-sub-color4">
        {/* 사이드바 */}
      </aside>
      <section className="flex w-full flex-col">
        <FullCalendar />
        <div className="flex h-[6.88rem] flex-col border-b border-t border-solid border-[#D9D9D9] text-sub-color3">
          <h1 className="my-[1.31rem] text-lg font-bold">이번달 진행 현황</h1>
          <ul className="flex w-full list-inside list-disc justify-between pr-[13.5rem] text-base font-semibold">
            {progrss.map((item, i) => (
              <ListItem
                text={item.text}
                count={item.count}
                color={item.color}
              />
            ))}
          </ul>
        </div>
      </section>
    </main>
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
    <span className="ml-[0.81rem] text-sub-color3">{count}회</span>
  </li>
);
