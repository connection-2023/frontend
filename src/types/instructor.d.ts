export interface instructorPostResponse {
  profileCardImageUrl: string | null;
  nickname: string;
  email: string;
  phoneNumber: string;
  youtubeUrl: string;
  instagramUrl: string;
  homepageUrl: string;
  affiliation: string;
  introduction: string;
  experience: string;
  lecturerRegion: any; // 추후 변경 예정
  lecturerDanceGenre: any; // 추후 변경 예정
  lecturerInstagramPostUrl: Url[]; // 추후 변경 예정
  lecturerProfileImageUrl: Url[]; // 추후 변경 예정
  stars: number;
  reviewCount: number;
  isLiked: boolean;
}

interface Url {
  url: string; // 추후 변경 예정
}

interface Bank {
  value: string;
  label: string;
}

interface Regions {
  [key: string]: string[];
}

export interface InstructorApplyData {
  nickname: string;
  phoneNumber: string;
  emailFront: string;
  emailBack: string;
  bankholder: string;
  birth: string;
  accountNumber: string;
  bank: Bank;
  affiliation: string;
  instagramPostUrls0: string;
  instagramPostUrls1: string;
  instagramPostUrls2: string;
  profileImageUrls: { file: File; imageUrl: string }[];
  regions: Regions;
  genres: string[];
  instagramUrl: string;
  youtubeUrl: string;
  homepageUrl: string;
  introduction: {
    content: string;
  };
  experience: {
    content: string;
  };
}

export interface IInstructorRegister {
  profileImageUrls: string[];
  nickname: string;
  email: string;
  phoneNumber: string;
  profileCardImageUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  homepageUrl?: string;
  affiliation?: string;
  introduction: string;
  experience?: string;
  regions: string[];
  genres: string[];
  instagramPostUrls?: string[];
  etcGenres?: string[];
}

export interface IInstructorReviewList {
  id: number;
  lectureId: number;
  userId: number;
  reservationId: number;
  stars: number;
  description: string;
  createdAt: string;
  reservation: {
    lectureSchedule: {
      startDateTime: string;
      lecture: {
        title: string;
      };
    };
  };
  users: {
    nickname: string;
    userProfileImage: { imageUrl: string };
  };
  likedLectureReview?: {}[];
  _count: {
    likedLectureReview: number;
  };
}

export interface searchInstructor {
  searchAfter: [number, number];
  id: number;
  nickname: string;
  affiliation: string;
  profileCardImageUrl: string;
  stars: number;
  isLiked: boolean;
  reviewCount: number;
  lecturerImages: string[];
  regions: { id: number; administrativeDistrict: string; district: string }[];
  genres: { id: number; genre: string }[];
}

export interface ILecturerLike {
  count: number;
  lecturerLike: LecturerLike[];
}

export interface LecturerLike {
  id: number;
  lecturerId: number;
  userId: number;
  lecturer: {
    nickname: string;
    affiliation: string;
    stars: number;
    lecturerRegion: {
      region: {
        id: number;
        administrativeDistrict: string;
        district: string;
      };
    }[];
    lecturerDanceGenre: {
      id: number;
      danceCategoryId: number;
      lecturerId: number;
      name: string | null;
      danceCategory: {
        genre: string;
      };
    }[];
    lecturerProfileImageUrl: {
      url: string;
    }[];
  };
}

export interface ILecturerBlock {
  count: number;
  lecturerBlock: LecturerBlock[];
}

export interface LecturerBlock {
  id: number;
  lecturerId: number;
  userId: number;
  lecturer: {
    nickname: string;
    lecturerProfileImageUrl: LecturerProfileImageUrl[];
  };
}

export interface InstructorBlock {
  id: number;
  nickname: string;
  imgURL: string[];
}

export interface searchInstructorParameters {
  take: number;
  sortOption: 'LATEST' | 'STARS';
  value?: string;
  searchAfter?: [number, number];
  genres?: string[];
  regions?: string[];
  stars?: number;
}
