import * as types from '../constants/actionTypes';

const initialState = {
  diets: [
    { id: 13, value: 'Gluten Free' },
    { id: 14, value: 'Vegan' },
    { id: 15, value: 'Vegetarian' },
    { id: 16, value: 'Pescetarian' },
    { id: 17, value: 'Paleo' },
    { id: 18, value: 'Ketogenic' },
    { id: 19, value: 'Whole30' },
  ],
  intolerances: [
    { id: 1, value: 'Dairy' },
    { id: 2, value: 'Egg' },
    { id: 3, value: 'Peanut' },
    { id: 4, value: 'Seafood' },
    { id: 5, value: 'Sesame' },
    { id: 6, value: 'Shellfish' },
    { id: 7, value: 'Soy' },
    { id: 8, value: 'Sulfite' },
    { id: 9, value: 'Tree Nut' },
  ],
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_DIETPREFERENCE:
      return {
        ...state,
        diets: action.payload.success ? action.payload.diet : state.diets,
      };
    case types.LOAD_INTOLERANCES:
      return {
        ...state,
        intolerances: action.payload.success ? action.payload.intolerance : state.intolerances,
      };
    default:
      return state;
  }
};

export default foodReducer;
