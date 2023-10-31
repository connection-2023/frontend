import { DOMAIN } from '@/constants/constants';

export const postSingleImage = async (image: File, folder: string) => {
  const formData = new FormData();
  formData.append('image', image);

  const response = await fetch(
    `${DOMAIN}/api/image/single?folder=${encodeURIComponent(folder)}`,
    {
      method: 'POST',
      credentials: 'include',
      body: formData,
    },
  ).then((data) => data.json());

  return response;
};

export const postMultipleImage = async (images: File[], folder: string) => {
  const formData = new FormData();

  images.forEach((image) => {
    formData.append('images', image);
  });

  const response = await fetch(
    `${DOMAIN}/api/image/multiple?folder=${encodeURIComponent(folder)}`,
    {
      method: 'POST',
      credentials: 'include',
      body: formData,
    },
  ).then((data) => data.json());

  return response;
};
