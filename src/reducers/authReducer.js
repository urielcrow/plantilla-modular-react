import {types} from '../types/types'


/********
 STATE
 {
     access, //Indica los privilegios para acceder al sistema
     name, //Nombre del usuario
     images //imagen o avatar
 }
 ********/

export const authReducer = (state = {}, action)=>{
    switch (action.type) {

        case types.login:
            return{
                ...state,
                ...action.payload
            }

        case types.logout:
            return{}

        default:
            return state;
    }
}