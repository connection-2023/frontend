import { render } from '@testing-library/react';
import DisplayCalendar from './DisplayCalendar';
import InteractionCalendar from './InteractionCalendar';

describe('Calendar', () => {
  it('renders DisplayCalendar without crashing', () => {
    const selectedDates = [new Date()];
    render(<DisplayCalendar selectedDates={selectedDates} />);
  });

  it('renders InteractionCalendar without crashing', () => {
    render(<InteractionCalendar />);
  });
});
