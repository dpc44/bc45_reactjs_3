import { stringToSlug } from "../../fun/stringToSlug";

const initialState = [

]

function saveLocalStorage (newArr) {
  var sNewArr = JSON.stringify(newArr);
  localStorage.setItem('arrSinhVien', sNewArr);
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SUBMIT_FORM': {
      const values = { ...action.payload };
      let newArr = [...state, values];
      state = newArr;
      saveLocalStorage(state);
    }; break;
    case 'XOA_USER': {

      let newState = [...state];
      newState = newState.filter((item) => item.maSV !== action.payload);

      state = newState;
      saveLocalStorage(state);
    }; break;

    case 'GET_LOCAL_STORAGE': {
      const values = [...action.payload];
      state = values;
    };break;
    case 'UPDATE_USER': {

      let newState = [...state];
      let IndexUpdate = newState.findIndex((item) => item.maSV.toUpperCase() == action.payload.maSV.toUpperCase());
      newState[IndexUpdate]={...action.payload};
      state = newState;
      saveLocalStorage(state);
    }; break;

    case 'SEARCH_BY_NAME': {
      const value =action.payload;
      let newState = [...state];
      // console.log(stringToSlug(newState[0].name));
      // console.log(stringToSlug(value));
      newState = newState.filter((item) => stringToSlug(item.name).includes(stringToSlug(value)));
      // console.log(newState);
      state = newState;
      
    }; break;

  }
  return state;
}
