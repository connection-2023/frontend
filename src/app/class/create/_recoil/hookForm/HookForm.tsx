import { useForm } from 'react-hook-form';
import { hookForm } from './atom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';

const HookForm = ({ children }: { children: React.ReactNode }) => {
  const formMethods = useForm();
  const setFormState = useSetRecoilState(hookForm);
  const isHookForm = useRecoilValue(hookForm);

  useEffect(() => {
    if (formMethods) {
      const copy = cloneDeep(formMethods);
      setFormState(copy);
    }
  }, [formMethods, setFormState]);

  return <>{isHookForm !== null && children}</>;
};

export default HookForm;
