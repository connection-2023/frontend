import { getLecturesPassList } from '@/lib/apis/serverApis/passApis';

interface PassProps {
  id: number;
}

const Pass = async ({ id }: PassProps) => {
  const passList = await getLecturesPassList(id);

  return <div />;
};

export default Pass;
