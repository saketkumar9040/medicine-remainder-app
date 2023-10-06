import { createSlice } from "@reduxjs/toolkit";

const reminderSlice = createSlice({
    name:"reminder",
    initialState:{
        reminderData:[]
    },
    reducers :{
        setReminderData :(state,action) => {
          state.reminderData = action.payload.reminderData
        },
    }
});

export const reminderReducer = reminderSlice.reducer;
export const { setReminderData } = reminderSlice.actions;