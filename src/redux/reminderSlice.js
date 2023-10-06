import { createSlice } from "@reduxjs/toolkit";

const reminderSlice = createSlice({
    name:"remainder",
    initialState:{
        reminderData:[]
    },
    reducers :{
        setReminderData :(state,action) => {
            const newReminder = action.payload.reminderData;
            state.reminderData.push(newReminder)
        }
    }
});

export const reminderReducer = reminderSlice.reducer;
export const { setReminderData } = reminderSlice.actions;