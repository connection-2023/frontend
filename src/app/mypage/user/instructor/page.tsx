import React from 'react';
import { CITY_ABBREVIATION_NAME } from '@/constants/administrativeDistrict';
import {
  getBlockInstructorList,
  getLikesInstructorList,
} from '@/lib/apis/serverApis/instructorLikesBlockApis';
import InstructorView from './_components/InstructorView';
import {
  InstructorBlock,
  LecturerBlock,
  LecturerLike,
} from '@/types/instructor';
import { Instructors } from '@/types/types';

const InstructorPage = async () => {
  const likesList: { count: number; lecturerLike: Instructors[] } = {
    count: 0,
    lecturerLike: [],
  };
  const blockedList: { count: number; lecturerBlock: InstructorBlock[] } = {
    count: 0,
    lecturerBlock: [],
  };

  try {
    const [likesInstructorList, blockedInstructorList] = await Promise.all([
      getLikesInstructorList(),
      getBlockInstructorList(),
    ]);

    likesList.lecturerLike = mapLecturerLike(
      likesInstructorList?.lecturerLike ?? [],
    );
    likesList.count = likesInstructorList?.count ?? 0;

    blockedList.lecturerBlock = mapLecturerBlock(
      blockedInstructorList?.lecturerBlock ?? [],
    );
    blockedList.count = blockedInstructorList?.count ?? 0;
  } catch (error) {
    console.error(error);
  }

  return <InstructorView likesList={likesList} blockedList={blockedList} />;
};

export default InstructorPage;

const mapLecturerLike = (lecturerLike: LecturerLike[]) => {
  return lecturerLike.map(({ lecturerId, lecturer }) => {
    const {
      nickname: name,
      affiliation: teamAffiliation,
      lecturerRegion,
      lecturerDanceGenre,
      lecturerProfileImageUrl,
      stars: average,
    } = lecturer;

    const address = lecturerRegion.map(
      ({ region }) =>
        CITY_ABBREVIATION_NAME[region.administrativeDistrict] +
        ' ' +
        region.district,
    );

    const genres = lecturerDanceGenre.map(
      ({ danceCategory }) => danceCategory.genre,
    );

    const imgURL = lecturerProfileImageUrl.map(({ url }) => url);

    const href = `/instructor/${lecturerId}`;

    return {
      id: lecturerId,
      name,
      teamAffiliation,
      address,
      genres,
      imgURL,
      average,
      href,
    };
  });
};

const mapLecturerBlock = (
  lecturerBlock: LecturerBlock[],
): InstructorBlock[] => {
  return lecturerBlock.map(({ lecturerId, lecturer }) => {
    return {
      id: lecturerId,
      nickname: lecturer.nickname,
      imgURL: lecturer.lecturerProfileImageUrl.map(({ url }) => url),
    };
  });
};
