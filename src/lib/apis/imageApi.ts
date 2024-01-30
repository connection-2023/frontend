export const postSingleImage = async (image: File, folder: string) => {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch(
      `/api/image/single?folder=${encodeURIComponent(folder)}`,
      {
        method: 'POST',
        credentials: 'include',
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error('단일 이미지 업로드 실패');
    }

    const data = await response.json();

    return data.data.imageUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postMultipleImage = async (images: File[], folder: string) => {
  try {
    const formData = new FormData();

    images.forEach((image) => {
      formData.append('images', image);
    });

    const response = await fetch(
      `/api/image/multiple?folder=${encodeURIComponent(folder)}`,
      {
        method: 'POST',
        credentials: 'include',
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error('다중 이미지 업로드 실패');
    }

    const data = await response.json();
    return data.data.imageUrls;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteImage = async (data: { imageUrl: string }) => {
  try {
    const response = await fetch(`/api/image/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('이미지 삭제 실패');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
