import * as actionType from './actionTypes'
export const addCart = (product) => {
    return{
        type:actionType.ADD_CART,
        product
    }
}
export const removeCart = (product) => {
    return{
        type: actionType.REMOVE_CART,
        product,
    }
}
export const removeAllCart = () => {
    return{
        type: actionType.REMOVE_ALL_CART,
    }
}
export const changeQuantity = (product) => {
    return{
        type: actionType.CHANGE_QUANTITY,
        product
    }
}