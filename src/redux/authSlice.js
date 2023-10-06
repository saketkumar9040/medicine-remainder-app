import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        userData:null
    },
    reducers :{
        setUserData :(state,action) => {
            state.userData=action.payload.userData;
        }
    }
});

export const authReducer = authSlice.reducer;
export const { setUserData } = authSlice.actions;