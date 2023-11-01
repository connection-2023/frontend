import { getInstructorProfile } from '@/lib/apis/instructorApi';
import { getSwitchUserRole } from '@/lib/apis/userApi';
import { Store } from '@/store';

export const switchToInstructor = async (store: Store) => {
  try {
    await getSwitchUserRole();

    const instructorProfile = await getInstructorProfile();

    if (instructorProfile) {
      store.setAuthUser(instructorProfile);
      store.setUserType('lecturer');
    }
  } catch (error) {
    console.error(error);
  }
};
