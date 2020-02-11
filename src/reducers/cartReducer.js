import * as actionType from '../actions/actionTypes'
import { act } from 'react-dom/test-utils'

const initialState = {
    cart:[],
}
export default function cartReducer(State = initialState, action){
    switch(action.type){
        case actionType.ADD_CART:{
            var isAvailable = false
            State.cart.map((Element) => {if(Element._id === action.product._id) {isAvailable=true}})
            if(isAvailable){
                const newCart = State.cart.map((Element) => {
                    if(Element._id === action.product._id){
                         action.product.quantity = Element.quantity + 1
                         return action.product
                    }else
                        return Element
                })
                return{                   
                    ...State,
                    cart:newCart
                }
            }else{               
                return{
                    ...State,
                    cart:[...State.cart, action.product]
                }
            }
        }
        case actionType.REMOVE_ALL_CART:{
            return{
                ...State,
                cart:[]
            }
        }
        case actionType.REMOVE_CART:{
            const newDelCart = State.cart.filter((e) => e._id !== action.product._id)
            return{
                ...State,
                cart: newDelCart
            }
        }
        case actionType.CHANGE_QUANTITY:{
            const newChangeCart = State.cart.map((e) => e._id === action.product._id ? action.product:e)
            return{
                ...State,
                cart: newChangeCart
            }
        }
        default:
            return State;
    }
}