'use client';
import { FormProvider, useForm } from 'react-hook-form';
import InstructorIntroduction from '@/app/instructor/apply/_components/InstructorIntroduction';

const EditInstructor = ({ defaultData }: { defaultData: any }) => {
  const formMethods = useForm({ shouldFocusError: false });

  return (
    <FormProvider {...formMethods}>
      <InstructorIntroduction defaultData={defaultData} />
    </FormProvider>
  );
};

export default EditInstructor;
