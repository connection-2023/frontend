import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Address from './_components/Address';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

const AddressPage = async () => {
  const headersList = headers();
  const referer = headersList.get('referer');

  if (
    process.env.NODE_ENV !== 'development' &&
    !referer?.startsWith(`${DOMAIN}/class/create`)
  ) {
    redirect('/404');
  }

  return <Address />;
};

export default AddressPage;
