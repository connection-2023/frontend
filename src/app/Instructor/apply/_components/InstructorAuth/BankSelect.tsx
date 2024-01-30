'use client';
import Select, {
  ActionMeta,
  GroupBase,
  MultiValue,
  SingleValue,
  StylesConfig,
} from 'react-select';
import { BANK_LIST } from '@/constants/constants';

interface SelectBank {
  value: string;
  label: string;
}

interface BankSelectProps {
  onChange: (
    selectedOptions: MultiValue<SelectBank> | SingleValue<SelectBank>,
    actionMeta: ActionMeta<SelectBank>,
  ) => void;
}

const BankSelect = ({ onChange }: BankSelectProps) => {
  return (
    <Select
      instanceId="bankSelect"
      placeholder="은행 선택"
      noOptionsMessage={() => '해당 은행은 존재하지 않습니다.'}
      options={BANK_LIST}
      onChange={onChange}
      styles={bankSelectStyle}
    />
  );
};

const bankSelectStyle:
  | StylesConfig<
      {
        value: any;
        label: string;
      },
      false,
      GroupBase<{
        value: any;
        label: string;
      }>
    >
  | undefined = {
  control: (provided) => ({
    ...provided,
    boxShadow: 'none',
    borderColor: 'var(--gray-500)',
    width: '100%',
    '&:hover': { borderColor: 'var(--gray-500)' },
  }),
  valueContainer: (provided) => ({
    ...provided,
    justifyContent: 'center',
    borderColor: 'none',
    height: '100%',
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: '-3px',
    boxShadow: 'none',
    border: '1px solid var(--gray-500)',
    borderTop: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'var(--gray-700)' : 'white',
    borderTop: '1px solid var(--gray-500)',
    color: 'black',
    '&:hover': {
      backgroundColor: 'var(--gray4)',
    },
  }),
};

export default BankSelect;
