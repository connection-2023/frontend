import { render } from '@testing-library/react';
import Calendar from '../src/components/Calendar/Calendar';

describe('Calendar', () => {
  it('renders without crashing', () => {
    const selectedDates = [new Date()];
    render(<Calendar selectedDates={selectedDates} />);
  });
});
