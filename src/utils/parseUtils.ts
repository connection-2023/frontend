import { IGenre, IRegion } from '@/types/types';

export const formatLocationToString = (
  regions: { region: IRegion }[] | IRegion[],
) =>
  regions
    .map((region) => {
      const isIRegion = 'administrativeDistrict' in region;

      const targetRegion = isIRegion ? region : region.region;
      const { administrativeDistrict, district } = targetRegion;

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
