

import { combineReducers, configureStore } from '@reduxjs/toolkit';

interface LoginState {
    username: string;
    mobileNo: number;
    email: string;
    addressLine1: string;
    addressLine2: string;
    area: string;
    city: string;
    state: string;
    pincode: number;
}
const loginState: LoginState = {
    username: '',
    mobileNo: 0,
    email: '',
    addressLine1: '',
    addressLine2: '',
    area: '',
    city: '',
    state: '',
    pincode: 0

};
const loginReducer = (state = loginState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                username: action.payload.name,
                mobileNo: action.payload.mobileNo,
                email: action.payload.username,
                addressLine1: action.payload.addressLine1,
                addressLine2: action.payload.addressLine2,
                area: action.payload.area,
                city: action.payload.city,
                state: action.payload.state,
                pincode: action.payload.pincode
            };
        case 'LOGOUT':
            return {
                ...state,
                username: '',
                mobileNo: 0,
                email: '',
                addressLine1: '',
                addressLine2: '',
                area: '',
                city: '',
                state: '',
                pincode: 0

            };
        default:
            return state;
    }
};

// Combine reducers
const rootReducer = combineReducers({
    login: loginReducer,
});
export const reduxStore = configureStore({ reducer: rootReducer });

