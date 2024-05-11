import createParams from '@/utils/createParams';
import {
  IGetNotifications,
  IGetNotificationsData,
  INotificationQuery,
  ISendNotification,
} from '@/types/notifications';
import { FetchError } from '@/types/types';

export const getNotifications = async (
  data: IGetNotifications,
): Promise<IGetNotificationsData> => {
  try {
    const params = createParams(data);

    const response = await fetch(
      `/api/notifications/get-notifications?${params}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();

    return {
      notifications: resData.data.notifications,
      totalItemCount: resData.data.totalItemCount,
    };
  } catch (error) {
    console.error('알림 불러오기 오류', error);
    throw error;
  }
};

export const deleteNotifications = async ({
  itemId,
  itemFilterOption,
}: INotificationQuery): Promise<INotificationQuery> => {
  try {
    const response = await fetch(
      `/api/notifications/delete?notificationsId=${itemId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    return { itemId, itemFilterOption };
  } catch (error) {
    console.error('알림 삭제 오류', error);
    throw error;
  }
};

export const getNotificationsUnreadCount = async (): Promise<number> => {
  try {
    const response = await fetch(`/api/notifications/unread-count`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();

    return resData.data.unreadNotificationCount;
  } catch (error) {
    console.error('안읽은 알림 개수 불러오기 오류', error);
    throw error;
  }
};

export const readNotifications = async ({
  itemId,
  itemFilterOption,
}: INotificationQuery): Promise<INotificationQuery> => {
  try {
    const response = await fetch(
      `/api/notifications/read?notificationsId=${itemId}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    return { itemId, itemFilterOption };
  } catch (error) {
    console.error('알림 읽음 처리 오류', error);
    throw error;
  }
};

export const sendNotifications = async (data: ISendNotification) => {
  try {
    const response = await fetch('/api/notifications/send-notifications', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();
    return resData.data;
  } catch (error) {
    console.error('알림 전송 오류', error);
    throw error;
  }
};

export const registerDeviceToken = async (data: { deviceToken: string }) => {
  try {
    const response = await fetch('/api/notifications/register-device-token', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }
  } catch (error) {
    console.error('유저 fmc 기기 토큰 등록 오류', error);
    throw error;
  }
};

export const deleteDeviceToken = async () => {
  try {
    const response = await fetch(`/api/notifications/delete-device-token`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }
  } catch (error) {
    console.error('유저 fmc 기기 토큰 삭제 오류', error);
    throw error;
  }
};
