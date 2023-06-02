const initialState = {
    maSV : '(*)',
    email:'(*)',
    name:'(*)',
    SDT:'(*)'

}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case'HANDLE_ERROR':{
        const {id, messageError} = payload;
        let newState = {...state};
        newState[id] = messageError;
        state = newState;
        // console.log(state)
    };break;
    case 'RESET_ERROR':{
      const values = payload;
      let newState = {...state};
      for(let key in values){
          newState[key] = '(*)';
      }
      state = newState
      
      
  };break;
  

  default:
    return state
  }
  return state
}
