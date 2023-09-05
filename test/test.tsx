import { render } from '@testing-library/react';
import Calendar from '../src/component/calendar';

describe('Calendar', () => {
  it('renders without crashing', () => {
    const selectedDates = [new Date()];
    render(<Calendar selectedDates={selectedDates} />);
  });
});
