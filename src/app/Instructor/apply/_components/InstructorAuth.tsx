import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const InstructorAuth = () => {
  const { watch } = useFormContext();

  const [verification, setVerification] = useState({
    nickname: false,
    email: true,
    phoneNumber: false,
    accountNumber: false,
  });

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      const key = name?.split('-')[0];
      if (key && key in verification) {
        setVerification((prev) => ({ ...prev, [key]: false }));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <section className="mt-2 flex w-full max-w-[40rem] flex-col text-base">
      <ul className="flex flex-col gap-[1.69rem] border-b border-solid border-sub-color4 py-7">
        <li className="flex items-center">
          <Label htmlFor="nickname" isNormal={true}>
            강사 닉네임
            <RequiredMark />
          </Label>
          <Input
            id="nickname"
            widthClass="max-w-[24.75rem]"
            labelName="강사 닉네임"
            verification={verification.nickname}
          />
          <button
            className={`ml-4 flex h-7 w-28 items-center justify-center whitespace-nowrap rounded-[0.31rem] px-2 py-1 text-white ${
              verification.nickname ? 'bg-sub-color2' : 'bg-black'
            }`}
          >
            중복 확인
          </button>
        </li>
        {/* error 있으면서 false때 에러 표시*/}

        <li className="flex items-center ">
          <Label htmlFor="phoneNumber" isNormal={true}>
            휴대폰 번호
            <RequiredMark />
          </Label>
          <Input
            id="phoneNumber"
            widthClass="max-w-[24.75rem]"
            labelName="휴대폰 번호"
            verification={verification.phoneNumber}
          />
          <button
            className={`ml-4 flex h-7 w-28 items-center justify-center whitespace-nowrap rounded-[0.31rem] px-2 py-1 text-white ${
              verification.nickname ? 'bg-sub-color2' : 'bg-black'
            }`}
          >
            인증번호 전송
          </button>
        </li>

        <li className="flex items-center">
          <Label htmlFor="email-front" isNormal={true}>
            이메일
            <RequiredMark />
          </Label>
          <Input
            id="email-front"
            widthClass="max-w-[11.4rem]"
            labelName="이메일"
            verification={verification.email}
          />
          <span className="mx-2">@</span>
          <Input
            id="email-back"
            widthClass="max-w-[11.4rem]"
            labelName="이메일"
            verification={verification.email}
          />
          <button
            className={`ml-4 flex h-7 w-28 items-center justify-center whitespace-nowrap rounded-[0.31rem] px-2 py-1 text-white ${
              verification.email ? 'bg-sub-color2' : 'bg-black'
            }`}
          >
            이메일 변경
          </button>
        </li>
      </ul>

      <ul className="flex flex-col gap-[1.31rem] py-7">
        <p className="flex items-center whitespace-nowrap font-semibold">
          계좌 등록<span className="text-sub-color1">*</span>
          <span className="ml-2 text-sm font-medium text-sub-color2">
            수업 정산금을 지급받을 계좌를 등록해주세요.
          </span>
        </p>

        <li className="flex items-center">
          <Label htmlFor="bankholder" isNormal={false}>
            예금주
          </Label>
          <Input
            id="bankholder"
            labelName="예금주"
            widthClass="max-w-[10rem]"
          />
        </li>

        <li className="flex items-center">
          <Label htmlFor="birth" isNormal={false}>
            생년월일
          </Label>
          <Input
            id="birth"
            widthClass="max-w-[10rem]"
            labelName="생년월일"
            placeholder="주민번호 앞 6자리"
          />
        </li>

        <li className="flex items-center">
          <Label htmlFor="bank" isNormal={false}>
            은행
          </Label>
          {/* --- react-select 사용 예정 --- */}
          <Select options={['국민은행', '신한은행', '우리은행']} />
        </li>

        <li className="flex items-center">
          <Label htmlFor="account-number" isNormal={false}>
            계좌번호
          </Label>
          <Input
            id="account-number"
            labelName="계좌번호"
            widthClass="max-w-[24.75rem]"
            placeholder="계좌번호를 - 없이 입력해주세요"
            verification={verification.accountNumber}
          />
          <button
            className={`ml-4 flex h-7 w-28 items-center justify-center whitespace-nowrap rounded-[0.31rem] bg-black px-2 py-1 text-white ${
              verification.accountNumber ? 'bg-sub-color2' : 'bg-black'
            }`}
          >
            인증하기
          </button>
        </li>
      </ul>
    </section>
  );
};

export default InstructorAuth;

interface LabelProps {
  htmlFor: string;
  isNormal: boolean;
  children: React.ReactNode;
}

const Label = ({ htmlFor, isNormal, children }: LabelProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <label
      htmlFor={htmlFor}
      className={`mr-10 whitespace-nowrap ${
        isNormal ? 'w-20 font-semibold' : 'w-14 font-normal'
      }`}
    >
      {children}
    </label>
  );
};

interface InputProps {
  id: string;
  labelName: string;
  widthClass: string;
  placeholder?: string;
  verification?: boolean;
}

const Input = ({
  id,
  widthClass,
  placeholder = '',
  labelName,
  verification,
}: InputProps) => {
  const { register } = useFormContext();

  const validationRules =
    verification !== undefined
      ? {
          required: labelName,
          validate: {
            isVerified: () => {
              if (!verification) return labelName;
            },
          },
        }
      : { required: labelName };

  return (
    <input
      {...register(id, validationRules)}
      id={id}
      placeholder={placeholder}
      className={`h-7 w-full ${widthClass} rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2
    focus:outline-sub-color1`}
    />
  );
};

const RequiredMark = () => <span className="text-sub-color1">*</span>;

interface SelectProps {
  options: string[];
}
const Select = ({ options }: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <select
      id="bank"
      value={selectedOption}
      onChange={handleChange}
      className="h-7 w-full max-w-[10rem] rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2 focus:outline-sub-color1"
    >
      <option value="" disabled>
        은행 선택
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
