import { IGenre, IRegion } from '@/types/types';

export const formatLocationToString = (regions: { region: IRegion }[]) =>
  regions
    .map((region) => {
      const { administrativeDistrict, district } = region.region;
      return `${administrativeDistrict} ${district || ''}`;
    })
    .join(', ');

export const formatGenreToString = (genres: IGenre[]) =>
  genres
    .map((genre) => {
      if (genre.name) return genre.name;
      else {
        return genre.danceCategory.genre;
      }
    })
    .join(', ');
