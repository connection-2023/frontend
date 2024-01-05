import { IEditSpecificDateType } from '@/types/class';

interface SpecificState {
  selected: IEditSpecificDateType[];
  selectableDates: Date[];
  selectedDate: Date | null;
}

type SpecificAction =
  | { type: 'SET_SELECTED'; payload: IEditSpecificDateType[] }
  | { type: 'ADD_SELECTED'; payload: IEditSpecificDateType }
  | { type: 'UPDATE_SELECTED'; index: number; item: IEditSpecificDateType }
  | { type: 'REMOVE_SELECTED'; index: number }
  | { type: 'SET_SELECTABLE_DATES'; payload: Date[] }
  | { type: 'SET_SELECTED_DATE'; payload: Date | null };

export function editSpecificDateReducer(
  state: SpecificState,
  action: SpecificAction,
): SpecificState {
  switch (action.type) {
    case 'SET_SELECTED':
      return { ...state, selected: action.payload };

    case 'SET_SELECTED_DATE':
      return { ...state, selectedDate: action.payload };

    case 'ADD_SELECTED':
      return { ...state, selected: [...state.selected, action.payload] };

    case 'UPDATE_SELECTED':
      const updatedSelected = [...state.selected];
      updatedSelected[action.index] = action.item;
      return { ...state, selected: updatedSelected };

    case 'REMOVE_SELECTED':
      const removedSelected = [...state.selected];
      removedSelected.splice(action.index, 1);
      return { ...state, selected: removedSelected };

    case 'SET_SELECTABLE_DATES':
      return { ...state, selectableDates: action.payload };

    default:
      throw new Error('Unhandled action');
  }
}
