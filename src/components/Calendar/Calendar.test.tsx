import { render } from '@testing-library/react';
import Calendar from './DisplayCalendar';

describe('Calendar', () => {
  it('renders without crashing', () => {
    const selectedDates = [new Date()];
    render(<Calendar selectedDates={selectedDates} />);
  });
});
