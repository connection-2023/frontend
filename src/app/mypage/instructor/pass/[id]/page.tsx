import { isNaN } from 'lodash';
import { redirect } from 'next/navigation';
import { getSalesStatusPass } from '@/lib/apis/serverApis/passApis';
import PassDetail from './_components/PassDetail';
import PassInfo from './_components/PassInfo';

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

  return (
    <section className="z-0 flex w-full flex-col px-3 sm:px-6 md:px-9 xl:px-0">
      <div className="z-0 flex w-full flex-col rounded-lg bg-white shadow-float">
        <PassInfo id={passId} />
        <hr className="h-2 bg-sub-color1-transparent" />
        <PassDetail passSituation={passSituation} />
      </div>
    </section>
  );
};

export default PassDetailPage;
