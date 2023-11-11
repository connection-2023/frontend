import { isSameDay } from 'date-fns';

// 토요일, 일요일
export const DAY_MODIFIERS = {
  saturday: (date: Date) => date.getDay() === 6,
  sunday: (date: Date) => date.getDay() === 0,
};

export const DAY_MODIFIERS_CLASSNAMES = {
  saturday: 'saturday',
  sunday: 'sunday',
};

export const SCHEDULE_MODIFIERS_CLASSNAMES = {
  ...DAY_MODIFIERS_CLASSNAMES,
  selectableDays: 'selectableDays',
};

export const DISABLED_AFTER = {
  ...DAY_MODIFIERS,
  disabled: { after: new Date() },
};

export const DISABLED_BEFORE = {
  ...DAY_MODIFIERS,
  disabled: { before: new Date() },
};

// 대시보드 캘린더
export const DASHBOARD_MODIFIERS_CLASSNAMES = {
  ...DAY_MODIFIERS_CLASSNAMES,
  scheduleDay: 'schedule-day',
};

// 스케쥴 캘린더
export const SCHEDULE_CLASSNAMES = {
  day_selected: 'schedule-selected-day',
};

export const DAY_OFF_MODIFIERS_ClassNames = {
  ...DAY_MODIFIERS_CLASSNAMES,
  selectableDays: 'class-input-selectable',
};

export const DAY_OFF_ClassNames = {
  day_selected: 'dayOff-selected-day',
};

export const INPUT_SCHEDULE_ClassNames = {
  day_selected: 'specific-selected-day',
};

export const INPUT_SCHEDULE_MODIFIERS_ClassNames = {
  ...DAY_MODIFIERS_CLASSNAMES,
  selectableDays: 'specific-selectable',
  classDay: 'specific-class-day',
};

export const getInputCalendarModifiers = (
  classDates: Date[] | null,
  clickableDates: Date[],
) => {
  const convertedClassDates = classDates?.map((dateStr) => new Date(dateStr));

  return {
    ...DAY_MODIFIERS,

    selectableDays: (date: Date) => isDateSelectable(clickableDates, date),
    disabled: (date: Date) => !isDateSelectable(clickableDates, date),
    classDay: (date: Date) => {
      return convertedClassDates
        ? convertedClassDates.some((classDate) => isSameDay(classDate, date))
        : false;
    },
  };
};

export const getSingleCalendarModifiers = (
  mode: 'schedule' | 'dashboard',
  clickableDates: Date[],
  scheduleDay: Date[],
) => {
  if (mode === 'schedule') {
    return {
      ...DAY_MODIFIERS,
      selectableDays: (date: Date) => isDateSelectable(clickableDates, date),
      disabled: (date: Date) => !isDateSelectable(clickableDates, date),
    };
  }
  return {
    ...DAY_MODIFIERS,
    scheduleDay: (date: Date) => isDateSelectable(scheduleDay, date),
  };
};

export const getSingleCalendarModifiersClassNames = (
  mode: 'schedule' | 'dashboard',
) =>
  mode === 'schedule'
    ? SCHEDULE_MODIFIERS_CLASSNAMES
    : DASHBOARD_MODIFIERS_CLASSNAMES;

export const getBasicCalendarModifiers = (
  mode: 'preview' | 'filter' | 'dayoff',
  clickableDates: Date[],
) => {
  if (mode === 'dayoff') {
    return {
      ...DAY_MODIFIERS,

      selectableDays: (date: Date) => {
        return isDateSelectable(clickableDates, date);
      },

      disabled: (date: Date) => {
        return !isDateSelectable(clickableDates, date);
      },
    };
  }
  return DAY_MODIFIERS;
};

export const getBasicCalendarModifiersClassNames = (
  mode: 'preview' | 'filter' | 'dayoff',
) =>
  mode === 'dayoff' ? DAY_OFF_MODIFIERS_ClassNames : DAY_MODIFIERS_CLASSNAMES;

export const isDateSelectable = (clickableDates: Date[], date: Date) => {
  return clickableDates.some((clickableDate) => isSameDay(date, clickableDate));
};
