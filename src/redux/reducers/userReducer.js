

const initialState ={
    maSV : '',
    email:'',
    name:'',
    SDT:''
}


export const userReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'HANDLE_FORM':{
            const{id, value} = action.payload;
            let newState = {...state};
            newState[id] = value;
            state = newState
        };break;

        case 'EDIT_USER':{
            const values = action.payload;

            let newState = {...values};
            state = newState
            
        };break;
    }
    return state
}