import { getInstructorProfile } from '@/lib/apis/instructorApi';
import { getSwitchUserRole } from '@/lib/apis/userApi';
import { IUserStore } from '@/store/userStore';

export const switchToInstructor = async (store: IUserStore) => {
  try {
    await getSwitchUserRole('lecturer');

    const instructorProfile = await getInstructorProfile();

    if (instructorProfile) {
      store.setAuthUser(instructorProfile);
      store.setUserType('lecturer');
    }
  } catch (error) {
    console.error(error);
  }
};
