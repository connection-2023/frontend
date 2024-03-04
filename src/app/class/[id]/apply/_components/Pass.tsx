import { getLecturesPassList } from '@/lib/apis/serverApis/passApis';
import PassContainer from './Pass/PassContainer';
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

  return <PassContainer passList={passList} />;
};

export default Pass;
