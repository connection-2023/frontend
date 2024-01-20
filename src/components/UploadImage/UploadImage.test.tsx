import { render, fireEvent, waitFor } from '@testing-library/react';
import { ImgHTMLAttributes } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import UploadImage from './UploadImage';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />;
  },
}));

describe('UploadImage', () => {
  it('should render without crashing', () => {
    const Wrapper = () => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <UploadImage defaultImg={[]} />
        </FormProvider>
      );
    };

    const { getByText } = render(<Wrapper />);
    expect(getByText('*최대 5개까지 업로드 가능합니다'));
  });

  it('should upload image when file input changes', async () => {
    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });

    global.URL.createObjectURL = jest.fn(() => 'dummy url');

    const Wrapper = () => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <UploadImage defaultImg={[]} />
        </FormProvider>
      );
    };

    const { getByLabelText } = render(<Wrapper />);

    const inputElement = getByLabelText(/클래스 사진 업로드/i);

    Object.defineProperty(inputElement, 'files', {
      value: [file],
    });
    fireEvent.change(inputElement);

    await waitFor(() => expect((inputElement as any).files[0]).toBe(file));
  });
});
