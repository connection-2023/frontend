import React from 'react';
import { getLikesInstructorList } from '@/lib/apis/serverApis/instructorLikesBlockApis';
import InstructorView from './_components/instructorView';

const InstructorPage = async () => {
  const [likesInstructorList] = await Promise.all([getLikesInstructorList()]);

  console.log(likesInstructorList);

  return <InstructorView />;
};

export default InstructorPage;
