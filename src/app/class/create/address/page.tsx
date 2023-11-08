import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { DOMAIN } from '@/constants/constants';
import Address from './_components/Address';

const AddressPage = async () => {
  const headersList = headers();
  const referer = headersList.get('referer');

  if (!referer?.startsWith(`${DOMAIN}/class/create`)) {
    redirect('/');
  }

  return <Address />;
};

export default AddressPage;
