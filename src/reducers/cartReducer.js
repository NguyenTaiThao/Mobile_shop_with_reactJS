import * as actionType from '../actions/actionTypes'
import { act } from 'react-dom/test-utils'

const initialState = {
    cart:[]
}
export default function cartReducer(State = initialState, action){
    switch(action.type){
        case actionType.ADD_CART:
        case actionType.CHANGE_QUANTITY:
        case actionType.REMOVE_CART:
            break;
        default:
            return State;
    }
}