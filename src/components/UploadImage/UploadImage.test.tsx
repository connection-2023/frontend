import { render, fireEvent, waitFor } from '@testing-library/react';
import UploadImage from './UploadImage';
import '@testing-library/jest-dom';
global.URL.createObjectURL = jest.fn();

describe('UploadImage', () => {
  it('should render without crashing', () => {
    const { getByText } = render(<UploadImage />);
    expect(getByText('*최대 5개까지 업로드 가능합니다')).toBeInTheDocument();
  });

  it('should upload image when file input changes', async () => {
    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });
    const { getByLabelText } = render(<UploadImage />);
    const input = getByLabelText(/클래스 사진 업로드/i) as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => expect((input as any).files[0]).toBe(file));
  });
});
