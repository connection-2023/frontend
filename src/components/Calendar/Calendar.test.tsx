import { render } from '@testing-library/react';
import Calendar from './Calendar';

describe('Calendar', () => {
  it('renders without crashing', () => {
    const selectedDates = [new Date()];
    render(<Calendar selectedDates={selectedDates} />);
  });
});
