export interface instructorPostResponse {
  profileCardImageUrl: string;
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
