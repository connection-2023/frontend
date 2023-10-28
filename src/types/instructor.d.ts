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
