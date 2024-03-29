import { PassSVG } from '@/icons/svg';
import { getLecturesPassList } from '@/lib/apis/serverApis/passApis';
import PassContainer from './PassContainer';
import { SelectPass } from '@/types/pass';

interface PassProps {
  id: number;
}

const Pass = async ({ id }: PassProps) => {
  let passList: SelectPass[] | null = [];
  try {
    const reqPassList = await getLecturesPassList(id);

    passList = reqPassList.map((pass) => ({
      value: pass,
      label: pass.lecturePass.title,
    }));
  } catch (error) {
    console.error(error);
    return null;
  }

  return (
    <section className="mt-4 rounded-md px-4 py-5 shadow-vertical">
      <h3 className="flex gap-1 text-lg font-semibold">
        <PassSVG className="h-6 w-6 fill-sub-color1" />
        패스권
      </h3>
      <PassContainer passList={passList} />
    </section>
  );
};

export default Pass;
