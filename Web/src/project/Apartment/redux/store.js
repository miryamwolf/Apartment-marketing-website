import { produce } from 'immer'
import { createStore } from "redux";
const initialState = {
    currentAdvertiser: {},
    currentApartment:{}
}
const reducer = produce((state, action) => {
    switch (action.type) {

        case 'SET_CURRENT_ADVERTISER':
            state.currentAdvertiser = action.payload
            return;

        case 'SET_CURRENT_APARTMENT':
                state.currentApartment = action.payload
                return;
        default:
            break;
    }
}, initialState)
const store = createStore(reducer)
export default store
