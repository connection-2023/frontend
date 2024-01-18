'use client';
import { FormProvider, useForm } from 'react-hook-form';
import InstructorIntroduction from '@/app/instructor/apply/_components/InstructorIntroduction';

const EditInstructor = () => {
  const formMethods = useForm({ shouldFocusError: false });

  return (
    <FormProvider {...formMethods}>
      <InstructorIntroduction />;
    </FormProvider>
  );
};

export default EditInstructor;
