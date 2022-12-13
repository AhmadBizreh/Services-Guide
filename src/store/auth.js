import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuth: localStorage.getItem('isAuth'),
    email: localStorage.getItem('email'),
    id: localStorage.getItem('id')
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(steat, action) {
            steat.isAuth = true;
            steat.email = action.payload.email;
            steat.id = action.payload.id;
            localStorage.setItem('isAuth', true);
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('id', action.payload.id);

        },
        logout(steat) {
            steat.isAuth = false;
            steat.email = null;
            steat.id = null;
            localStorage.clear();
        },

    }
})
export const authAction = authSlice.actions;
export default authSlice.reducer;


// login(steat ,action) {
//     steat.isAuth = true;
//     steat.id = action.payload.id;
// },