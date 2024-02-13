import { redirect } from 'next/navigation';

const page = async () => {
  redirect('/class/create/drafts');
};

export default page;
