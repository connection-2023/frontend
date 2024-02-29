import { isNaN } from 'lodash';
import { redirect } from 'next/navigation';
import { getSalesStatusPass } from '@/lib/apis/serverApis/passApis';
import PassDetail from './_components/PassDetail';

const PassDetailPage = async ({
  params,
}: {
  params: { [key: string]: string };
}) => {
  const passId = Number(params.id);

  if (!passId || isNaN(passId)) {
    redirect('/404');
  }

  const resPassSituation = await getSalesStatusPass(passId);

  const passSituation = resPassSituation.flatMap((passInfo) => {
    const { startAt, endAt, remainingUses, createdAt } = passInfo.userPass;

    const data = {
      ...passInfo,
      classList:
        passInfo.reservations?.map(({ lecture }) => lecture.title) ?? [],
      count: remainingUses,
      purchaseDate: createdAt,
      startAt,
      endAt,
    };

    return data;
  });

  return <PassDetail passSituation={passSituation} />;
};

export default PassDetailPage;
